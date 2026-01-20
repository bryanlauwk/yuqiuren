import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RankingShareCard } from './RankingShareCard';
import { Download, Share2, Loader2, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import type { PlayerRanking } from '@/types/ranking';

interface ShareRankingModalProps {
  open: boolean;
  onClose: () => void;
  rankings: PlayerRanking[];
}

export function ShareRankingModal({ open, onClose, rankings }: ShareRankingModalProps) {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const brandName = language === 'zh' ? '羽球人联赛' : 'Badminton League';
  const subtitle = language === 'zh' ? '2026 官方积分榜' : '2026 Official Rankings';

  // Generate image when modal opens
  useEffect(() => {
    if (open && cardRef.current) {
      setIsGenerating(true);
      // Small delay to ensure the card is rendered
      setTimeout(() => {
        generateImage();
      }, 100);
    }
  }, [open]);

  const generateImage = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#8B0000',
      });
      setImageUrl(dataUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error(language === 'zh' ? '生成图片失败' : 'Failed to generate image');
    } finally {
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
        // Fall through to WhatsApp URL method
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            {language === 'zh' ? '分享排行榜' : 'Share Rankings'}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            {language === 'zh' 
              ? '生成排名图片并分享到WhatsApp' 
              : 'Generate ranking image and share to WhatsApp'}
          </p>
        </div>

        {/* Hidden card for image generation */}
        <div className="absolute -left-[9999px] -top-[9999px]">
          <RankingShareCard
            ref={cardRef}
            rankings={rankings}
            brandName={brandName}
            subtitle={subtitle}
          />
        </div>

        {/* Preview */}
        <div className="px-6 pb-4">
          <div className="rounded-lg overflow-hidden border shadow-md">
            {isGenerating ? (
              <div className="w-full aspect-[400/520] bg-gradient-to-br from-[#8B0000] to-[#4A0000] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-sm">{language === 'zh' ? '生成中...' : 'Generating...'}</span>
                </div>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Rankings preview" 
                className="w-full"
              />
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleDownload}
            disabled={!imageUrl || isGenerating}
          >
            <Download className="w-4 h-4 mr-2" />
            {language === 'zh' ? '下载图片' : 'Download'}
          </Button>
          <Button 
            className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white"
            onClick={handleWhatsAppShare}
            disabled={!imageUrl || isGenerating}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            )}
            WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
