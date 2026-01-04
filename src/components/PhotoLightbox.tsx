import { useState, useRef, useCallback, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoLightboxProps {
  images: { src: string; alt?: string }[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function PhotoLightbox({ 
  images, 
  currentIndex, 
  open, 
  onClose,
  onIndexChange 
}: PhotoLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  // Reset state when dialog opens/closes or image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setSwipeOffset(0);
  }, [open, currentIndex]);

  const goToPrev = useCallback(() => {
    if (canGoPrev && scale === 1) {
      onIndexChange?.(currentIndex - 1);
    }
  }, [canGoPrev, currentIndex, onIndexChange, scale]);

  const goToNext = useCallback(() => {
    if (canGoNext && scale === 1) {
      onIndexChange?.(currentIndex + 1);
    }
  }, [canGoNext, currentIndex, onIndexChange, scale]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, goToPrev, goToNext, onClose]);

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
      setSwipeStartX(e.touches[0].clientX);
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
        // Track swipe for gallery navigation or dismiss
        const deltaX = e.touches[0].clientX - swipeStartX;
        const deltaY = e.touches[0].clientY - dragStart.y;
        
        // Prioritize horizontal swipe for gallery nav if multiple images
        if (hasMultiple && Math.abs(deltaX) > Math.abs(deltaY)) {
          setSwipeOffset(deltaX);
          setPosition({ x: 0, y: 0 });
        } else if (Math.abs(deltaY) > 10) {
          // Vertical swipe for dismiss
          setPosition({ x: 0, y: deltaY });
          setSwipeOffset(0);
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchDistance(null);
    setIsDragging(false);
    
    const threshold = 80;
    
    // Handle horizontal swipe for gallery navigation
    if (scale === 1 && hasMultiple && Math.abs(swipeOffset) > threshold) {
      if (swipeOffset > 0 && canGoPrev) {
        goToPrev();
      } else if (swipeOffset < 0 && canGoNext) {
        goToNext();
      }
    }
    
    // Swipe down to dismiss when not zoomed
    if (scale === 1 && Math.abs(position.y) > 100) {
      onClose();
    } else if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
    
    setSwipeOffset(0);
    
    // Handle tap
    if (e.changedTouches.length === 1 && Math.abs(position.y) < 10 && Math.abs(swipeOffset) < 10) {
      handleTap();
    }
  };

  if (!currentImage) return null;

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

        {/* Gallery navigation arrows */}
        {hasMultiple && scale === 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-opacity",
                !canGoPrev && "opacity-30 cursor-not-allowed"
              )}
              onClick={goToPrev}
              disabled={!canGoPrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-opacity",
                !canGoNext && "opacity-30 cursor-not-allowed"
              )}
              onClick={goToNext}
              disabled={!canGoNext}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Image counter */}
        {hasMultiple && (
          <div className="absolute top-4 left-4 z-50">
            <span className="text-white/80 text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Hint text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <p className="text-white/60 text-sm backdrop-blur-sm px-4 py-2 rounded-full bg-white/5 text-center">
            {scale > 1 
              ? 'Drag to pan • Double-tap to reset' 
              : hasMultiple 
                ? 'Swipe left/right to browse • Swipe down to close'
                : 'Pinch or double-tap to zoom • Swipe down to close'
            }
          </p>
        </div>

        {/* Dot indicators */}
        {hasMultiple && images.length <= 10 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/40 hover:bg-white/60"
                )}
                onClick={() => onIndexChange?.(idx)}
              />
            ))}
          </div>
        )}

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
            src={currentImage.src}
            alt={currentImage.alt || 'Image'}
            className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
            style={{
              transform: `scale(${scale}) translate(${(position.x + swipeOffset) / scale}px, ${position.y / scale}px)`,
              opacity: scale === 1 ? 1 - Math.abs(position.y) / 300 : 1,
            }}
            draggable={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}