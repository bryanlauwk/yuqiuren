import { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut, Move } from 'lucide-react';

interface AvatarCropperProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  onCrop: (croppedBlob: Blob) => void;
}

export function AvatarCropper({ open, onClose, imageSrc, onCrop }: AvatarCropperProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart]);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 256; // Output size
    canvas.width = size;
    canvas.height = size;

    // Calculate crop area
    const cropSize = 200; // Visible area size
    const scaledWidth = img.naturalWidth * scale;
    const scaledHeight = img.naturalHeight * scale;
    
    // Center offset
    const centerX = cropSize / 2;
    const centerY = cropSize / 2;
    
    // Calculate source coordinates
    const sourceX = (centerX - position.x - scaledWidth / 2) / scale;
    const sourceY = (centerY - position.y - scaledHeight / 2) / scale;
    const sourceSize = cropSize / scale;

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceSize,
      sourceSize,
      0,
      0,
      size,
      size
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(blob);
        handleClose();
      }
    }, 'image/jpeg', 0.9);
  };

  const handleClose = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imageRef.current = e.currentTarget;
    // Auto-fit image to container
    const img = e.currentTarget;
    const containerSize = 200;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    
    if (imgAspect > 1) {
      // Landscape - fit by height
      setScale(containerSize / img.naturalHeight);
    } else {
      // Portrait - fit by width
      setScale(containerSize / img.naturalWidth);
    }
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Move className="w-5 h-5 text-primary" />
            Position Avatar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crop Area */}
          <div 
            ref={containerRef}
            className="relative w-[200px] h-[200px] mx-auto rounded-full overflow-hidden border-4 border-primary bg-muted cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={imageSrc}
              alt="Crop preview"
              onLoad={handleImageLoad}
              className="absolute select-none pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                left: '50%',
                top: '50%',
                transformOrigin: 'center center',
              }}
              draggable={false}
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-3 px-4">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[scale]}
              onValueChange={([value]) => setScale(value)}
              min={0.5}
              max={3}
              step={0.1}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Drag to position • Scroll to zoom
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>
            Save Avatar
          </Button>
        </DialogFooter>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}