import { useState, useRef, useCallback, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoLightboxProps {
  src: string | null;
  alt?: string;
  open: boolean;
  onClose: () => void;
}

export function PhotoLightbox({ src, alt = 'Image', open, onClose }: PhotoLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [open]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  // Double tap detection for mobile
  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleDoubleClick();
    }
    setLastTap(now);
  }, [lastTap, scale]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for swipe and pinch-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      setTouchDistance(getTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      // Single touch for pan or swipe
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      // Pinch zoom
      const newDistance = getTouchDistance(e.touches);
      if (newDistance) {
        const scaleDiff = (newDistance - touchDistance) / 200;
        setScale(prev => Math.max(1, Math.min(4, prev + scaleDiff)));
        setTouchDistance(newDistance);
      }
    } else if (e.touches.length === 1 && isDragging) {
      if (scale > 1) {
        // Pan when zoomed
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        });
      } else {
        // Track swipe distance for dismiss gesture
        const deltaY = e.touches[0].clientY - dragStart.y;
        if (Math.abs(deltaY) > 10) {
          setPosition({ x: 0, y: deltaY });
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchDistance(null);
    setIsDragging(false);
    
    // Swipe to dismiss when not zoomed
    if (scale === 1 && Math.abs(position.y) > 100) {
      onClose();
    } else if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
    
    // Handle tap
    if (e.changedTouches.length === 1 && Math.abs(position.y) < 10) {
      handleTap();
    }
  };

  if (!src) return null;

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent 
        className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 border-none bg-black/95 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            onClick={handleZoomOut}
            disabled={scale <= 1}
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            onClick={handleZoomIn}
            disabled={scale >= 4}
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Hint text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <p className="text-white/60 text-sm backdrop-blur-sm px-4 py-2 rounded-full bg-white/5">
            {scale > 1 ? 'Drag to pan • Double-tap to reset' : 'Pinch or double-tap to zoom • Swipe down to close'}
          </p>
        </div>

        {/* Image container */}
        <div
          ref={containerRef}
          className={cn(
            "w-full h-full flex items-center justify-center",
            isDragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              opacity: scale === 1 ? 1 - Math.abs(position.y) / 300 : 1,
            }}
            draggable={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}