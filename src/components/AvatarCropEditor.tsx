import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Move } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AvatarCropEditorProps {
  fullImageUrl: string;
  initialCropX: number;
  initialCropY: number;
  onSave: (cropX: number, cropY: number) => void;
  onCancel: () => void;
}

export function AvatarCropEditor({
  fullImageUrl,
  initialCropX,
  initialCropY,
  onSave,
  onCancel,
}: AvatarCropEditorProps) {
  const { t } = useLanguage();
  const [cropX, setCropX] = useState(initialCropX);
  const [cropY, setCropY] = useState(initialCropY);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    setCropX(x);
    setCropY(y);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Calculate the visible portion of the image in the circle
  const circleSize = 120;
  const previewOffset = {
    x: (0.5 - cropX) * 100,
    y: (0.5 - cropY) * 100,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.admin?.adjustCropPosition || 'Adjust Crop Position'}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.admin?.dragToPosition || 'Drag on the image to position the circular view'}
        </p>

        {/* Main image with crop indicator */}
        <div
          ref={containerRef}
          className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden cursor-crosshair mb-4 select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={fullImageUrl}
            alt="Full avatar"
            className="w-full h-full object-cover"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay with circular cutout */}
          {imageLoaded && (
            <>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-background/60 pointer-events-none" />
              
              {/* Circle indicator at crop position */}
              <div
                className="absolute w-24 h-24 border-4 border-primary rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                style={{
                  left: `${cropX * 100}%`,
                  top: `${cropY * 100}%`,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)',
                }}
              />
              
              {/* Move icon at center */}
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${cropX * 100}%`,
                  top: `${cropY * 100}%`,
                }}
              >
                <Move className="w-6 h-6 text-primary-foreground drop-shadow-lg" />
              </div>
            </>
          )}
        </div>

        {/* Preview */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-muted-foreground">
            {t.admin?.preview || 'Preview'}:
          </span>
          <div
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-border"
            style={{ borderRadius: '60% 40% 50% 50% / 50% 50% 40% 60%' }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${fullImageUrl})`,
                backgroundSize: '200%',
                backgroundPosition: `${cropX * 100}% ${cropY * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            {t.admin?.cancel || 'Cancel'}
          </Button>
          <Button onClick={() => onSave(cropX, cropY)}>
            <Check className="w-4 h-4 mr-2" />
            {t.admin?.saveCrop || 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}