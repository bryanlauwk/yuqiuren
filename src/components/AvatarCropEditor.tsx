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
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  // Compute the rect of the actually-displayed (object-contain) image within the square container.
  const getDisplayedRect = () => {
    if (!containerRef.current || !imgSize) return null;
    const c = containerRef.current.getBoundingClientRect();
    const scale = Math.min(c.width / imgSize.w, c.height / imgSize.h);
    const dw = imgSize.w * scale;
    const dh = imgSize.h * scale;
    return {
      left: (c.width - dw) / 2,
      top: (c.height - dh) / 2,
      width: dw,
      height: dh,
      containerWidth: c.width,
      containerHeight: c.height,
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const disp = getDisplayedRect();
    if (!disp) return;
    // Position within the displayed image, normalized to [0,1] of the source image.
    const relX = clientX - rect.left - disp.left;
    const relY = clientY - rect.top - disp.top;
    const x = Math.max(0, Math.min(1, relX / disp.width));
    const y = Math.max(0, Math.min(1, relY / disp.height));
    setCropX(x);
    setCropY(y);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX, e.clientY);
  };
  const handleMouseUp = () => setIsDragging(false);
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

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, []);

  // Compute marker position in container coordinates from (cropX, cropY) in source-image space.
  const disp = getDisplayedRect();
  const markerLeftPct = disp
    ? ((disp.left + cropX * disp.width) / disp.containerWidth) * 100
    : cropX * 100;
  const markerTopPct = disp
    ? ((disp.top + cropY * disp.height) / disp.containerHeight) * 100
    : cropY * 100;

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
          onTouchEnd={handleMouseUp}
        >
          {/* object-contain so container coords map directly to source-image coords */}
          <img
            ref={imgRef}
            src={fullImageUrl}
            alt="Full avatar"
            className="w-full h-full object-contain"
            draggable={false}
            onLoad={(e) => {
              const el = e.currentTarget;
              setImgSize({ w: el.naturalWidth, h: el.naturalHeight });
            }}
          />

          {imgSize && (
            <>
              <div className="absolute inset-0 bg-background/40 pointer-events-none" />
              <div
                className="absolute w-24 h-24 border-4 border-primary rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                style={{
                  left: `${markerLeftPct}%`,
                  top: `${markerTopPct}%`,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)',
                }}
              />
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${markerLeftPct}%`, top: `${markerTopPct}%` }}
              >
                <Move className="w-6 h-6 text-primary-foreground drop-shadow-lg" />
              </div>
            </>
          )}
        </div>

        {/* Preview — mirror how consumers render the avatar (object-cover + objectPosition %) */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-muted-foreground">
            {t.admin?.preview || 'Preview'}:
          </span>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
            <img
              src={fullImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{ objectPosition: `${cropX * 100}% ${cropY * 100}%` }}
              draggable={false}
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
