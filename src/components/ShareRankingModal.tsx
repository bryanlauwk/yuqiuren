import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, Share2, Loader2, Check, Sparkles, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { PlayerRanking } from '@/types/ranking';

interface ShareRankingModalProps {
  open: boolean;
  onClose: () => void;
  rankings: PlayerRanking[];
}

export function ShareRankingModal({ open, onClose, rankings }: ShareRankingModalProps) {
  const { language } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const brandName = language === 'zh' ? '羽球人联赛' : 'Badminton League';

  // Generate image when modal opens
  useEffect(() => {
    if (open && !imageUrl && rankings.length > 0) {
      generateImage();
    }
  }, [open, rankings]);

  const generateImage = async () => {
    if (rankings.length === 0) return;
    
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setImageUrl(null);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 90));
    }, 500);

    try {
      const playersData = rankings.slice(0, 10).map(p => ({
        rank: p.rank,
        name: p.player_name,
        points: p.total_points,
        avatarUrl: p.avatar_url,
      }));

      const { data, error: fnError } = await supabase.functions.invoke('generate-ranking-image', {
        body: { players: playersData, language },
      });

      clearInterval(progressInterval);

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (!data?.imageUrl) {
        throw new Error('No image returned');
      }

      setProgress(100);
      setImageUrl(data.imageUrl);
      toast.success(language === 'zh' ? 'AI图片生成成功！' : 'AI image generated!');
    } catch (err) {
      console.error('Failed to generate image:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      toast.error(language === 'zh' ? `生成失败: ${errorMessage}` : `Generation failed: ${errorMessage}`);
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.download = `badminton-rankings-${new Date().toISOString().split('T')[0]}.png`;
    link.href = imageUrl;
    link.click();
    
    toast.success(language === 'zh' ? '图片已下载' : 'Image downloaded');
  };

  const handleWhatsAppShare = async () => {
    const shareText = language === 'zh' 
      ? `🏸 羽球人联赛最新积分榜！\n\n查看完整排名: https://yuqiuren.lovable.app`
      : `🏸 Check out the latest Badminton League rankings!\n\nView full rankings: https://yuqiuren.lovable.app`;

    // Try Web Share API first (works on mobile)
    if (navigator.share && imageUrl) {
      try {
        const blob = await fetch(imageUrl).then(r => r.blob());
        const file = new File([blob], 'rankings.png', { type: 'image/png' });
        
        await navigator.share({
          title: brandName,
          text: shareText,
          files: [file],
        });
        return;
      } catch (error) {
        console.log('Web Share failed, falling back to WhatsApp URL');
      }
    }

    // Fallback: Download image and open WhatsApp with text
    if (imageUrl) {
      handleDownload();
    }
    
    // Copy share text
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy text');
    }

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success(
      language === 'zh' 
        ? '图片已下载，分享文字已复制。请在WhatsApp中粘贴并附加图片。' 
        : 'Image downloaded, share text copied. Paste and attach image in WhatsApp.'
    );
  };

  const handleClose = () => {
    setImageUrl(null);
    setError(null);
    setProgress(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {language === 'zh' ? 'AI 生成排行榜图片' : 'AI-Generated Rankings'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            {language === 'zh' 
              ? '使用AI生成专业的体育风格排名海报' 
              : 'Generate a professional sports-style ranking poster with AI'}
          </p>
        </div>

        {/* Preview */}
        <div className="px-6 pb-4">
          <div className="rounded-lg overflow-hidden border shadow-md bg-gradient-to-br from-[#8B0000] to-[#4A0000]">
            {isGenerating ? (
              <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-4 p-8">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-white" />
                  <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">
                    {language === 'zh' ? 'AI 正在创作中...' : 'AI is creating your image...'}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {language === 'zh' ? '这可能需要 10-20 秒' : 'This may take 10-20 seconds'}
                  </p>
                </div>
                <div className="w-full max-w-48">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-white/60 text-center mt-1">{progress}%</p>
                </div>
              </div>
            ) : error ? (
              <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-center">
                  <p className="text-white font-medium">
                    {language === 'zh' ? '生成失败' : 'Generation Failed'}
                  </p>
                  <p className="text-white/60 text-sm mt-2 max-w-64">{error}</p>
                </div>
                <Button 
                  onClick={generateImage}
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === 'zh' ? '重试' : 'Retry'}
                </Button>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Rankings preview" 
                className="w-full"
              />
            ) : (
              <div className="w-full aspect-[3/4] flex items-center justify-center">
                <p className="text-white/60">{language === 'zh' ? '准备生成...' : 'Preparing...'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={generateImage}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {language === 'zh' ? '重新生成' : 'Regenerate'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDownload}
            disabled={!imageUrl || isGenerating}
          >
            <Download className="w-4 h-4 mr-2" />
            {language === 'zh' ? '下载' : 'Download'}
          </Button>
          <Button 
            className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white"
            onClick={handleWhatsAppShare}
            disabled={!imageUrl || isGenerating}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" />
            )}
            WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
