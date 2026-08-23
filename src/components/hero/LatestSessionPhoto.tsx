import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  rotate: number;
  translateY: number;
}

export function LatestSessionPhoto({ rotate, translateY }: Props) {
  const { language } = useLanguage();
  const { sessions, loading } = useRankings();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);


  const photoSessions = useMemo(
    () => sessions.filter((s) => s.group_photo_url).slice(0, 6),
    [sessions],
  );

  const active = photoSessions[activeIndex] ?? null;

  // Empty / loading state
  if (loading || photoSessions.length === 0) {
    return (
      <div
        className="relative bg-background border-2 border-foreground rounded-2xl shadow-[8px_8px_0_0_hsl(var(--accent))] overflow-hidden w-[320px] md:w-[440px]"
        style={{ transform: `rotate(${rotate}deg) translateY(${translateY}px)` }}
      >
        <div className="relative bg-muted aspect-square md:aspect-[4/3] w-full">
          {loading ? (
            <div className="w-full h-full animate-pulse-arena bg-muted" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground p-4 text-center">
              <div className="font-display text-sm tracking-[0.2em]">
                {language === 'zh' ? '暂无合照' : 'NO PHOTO YET'}
              </div>
              <div className="font-display text-[10px] tracking-widest opacity-70">
                {language === 'zh' ? '管理员可在后台上传' : 'ADMIN CAN UPLOAD'}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile: horizontal snap carousel
  if (isMobile) {
    return (
      <div
        className="w-full max-w-[360px]"
        style={{ transform: `rotate(${rotate * 0.5}deg) translateY(${translateY}px)` }}
      >
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {photoSessions.map((s) => (
            <div
              key={s.id}
              className="shrink-0 w-[280px] snap-center bg-background border-2 border-foreground rounded-2xl shadow-[6px_6px_0_0_hsl(var(--accent))] overflow-hidden"
            >
              <div className="relative bg-muted aspect-square w-full overflow-hidden">
                <img
                  src={s.group_photo_url!}
                  alt={s.name || 'Session group photo'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        {photoSessions.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-1">
            {photoSessions.map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-foreground/30"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop: draggable main image + thumbnail row
  const go = (dir: 1 | -1) =>
    setActiveIndex((i) => (i + dir + photoSessions.length) % photoSessions.length);

  const onPointerDown = (e: React.PointerEvent) => {
    if (photoSessions.length < 2) return;
    const startX = e.clientX;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    setDragging(true);

    const onMove = (ev: PointerEvent) => setDragX(ev.clientX - startX);
    const onUp = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      setDragging(false);
      setDragX(0);
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
  };

  return (
    <div className="w-[440px]">
      {/* Main image — drag left/right to browse */}
      <div
        onPointerDown={onPointerDown}
        className={`group relative bg-background border-2 border-foreground rounded-2xl shadow-[8px_8px_0_0_hsl(var(--accent))] overflow-hidden transition-all duration-300 ease-out hover:shadow-[12px_12px_0_0_hsl(var(--accent))] hover:-translate-y-1 will-change-transform touch-none select-none ${
          photoSessions.length > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''
        }`}
        style={{
          transform: `rotate(${rotate}deg) translateY(${translateY}px) translateX(${dragX * 0.35}px)`,
          transition: dragging ? 'none' : undefined,
        }}
      >
        <div className="relative bg-muted aspect-[4/3] w-full overflow-hidden">
          {active?.group_photo_url && (
            <img
              key={active.id}
              src={active.group_photo_url}
              alt={active.name || 'Session group photo'}
              className="w-full h-full object-cover animate-fade-in transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              draggable={false}
            />
          )}
        </div>
      </div>


      {/* Thumbnail strip */}
      {photoSessions.length > 1 && (
        <div className="mt-4 grid grid-cols-6 gap-2">
          {photoSessions.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={s.name || `Session ${i + 1}`}
                className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-accent shadow-[3px_3px_0_0_hsl(var(--foreground))] scale-[1.02]'
                    : 'border-foreground/30 hover:border-foreground opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={s.group_photo_url!}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
