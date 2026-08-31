import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

export function LatestSessionPhoto() {
  const { language } = useLanguage();
  const { sessions, loading } = useRankings();
  const [activeIndex, setActiveIndex] = useState(0);
  const isZh = language === 'zh';

  const photoSessions = useMemo(
    () => sessions.filter((session) => session.group_photo_url).slice(0, 6),
    [sessions],
  );
  const active = photoSessions[activeIndex] ?? null;

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + photoSessions.length) % photoSessions.length);
  };

  if (loading || !active) {
    return (
      <div className="relative flex min-h-56 items-center justify-center px-4 py-12 sm:min-h-72">
        {loading ? (
          <div className="h-36 w-full max-w-5xl animate-pulse-arena bg-[hsl(var(--band-foreground))]/10" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center text-[hsl(var(--band-foreground))]/60">
            <Camera className="h-7 w-7" />
            <span className="font-sans text-xs font-black uppercase tracking-[0.22em]">
              {isZh ? '赛事合照即将登场' : 'MATCH PHOTOS COMING SOON'}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative -mt-px h-[clamp(26rem,52vw,48rem)] overflow-hidden">
      <img
        key={active.id}
        src={active.group_photo_url!}
        alt={active.name || (isZh ? '近期赛事合照' : 'Recent match group photo')}
        className="hero-photo-image absolute inset-0 h-full w-full animate-fade-in object-cover object-[center_30%]"
      />
      <div className="hero-photo-overlay absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="container pb-5 sm:pb-7">
          <div className="flex items-end justify-between gap-5">
            <div className="min-w-0">
              <div className="mb-1 font-sans text-[10px] font-black uppercase tracking-[0.24em] text-[hsl(var(--band-foreground))]/65">
                {isZh ? '最新合照' : 'LATEST TEAM PHOTO'} · {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <div className="truncate font-display text-2xl leading-none band-fg sm:text-4xl">
                {active.name || active.session_date.replace(/-/g, '.')}
              </div>
            </div>

            {photoSessions.length > 1 && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={isZh ? '上一张合照' : 'Previous photo'}
                  className="grid h-11 w-11 place-items-center border border-[hsl(var(--band-foreground))]/50 bg-[hsl(var(--band-surface))]/70 band-fg backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={isZh ? '下一张合照' : 'Next photo'}
                  className="grid h-11 w-11 place-items-center border border-[hsl(var(--band-foreground))]/50 bg-[hsl(var(--band-surface))]/70 band-fg backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {photoSessions.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar sm:mt-5">
              {photoSessions.map((session, index) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${isZh ? '查看合照' : 'View photo'} ${index + 1}`}
                  aria-current={index === activeIndex}
                  className={`relative h-14 w-24 shrink-0 overflow-hidden border-2 transition-all sm:h-16 sm:w-28 ${
                    index === activeIndex
                      ? 'border-accent opacity-100'
                      : 'border-[hsl(var(--band-foreground))]/20 opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={session.group_photo_url!}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
