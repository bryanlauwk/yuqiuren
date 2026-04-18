import { useLanguage } from '@/contexts/LanguageContext';
import { CircleArrow } from '@/components/ink/CircleArrow';
import { useRankings } from '@/hooks/useRankings';
import { GraffitiAccents } from '@/components/hero/GraffitiAccents';

export function ArenaHero() {
  const { t } = useLanguage();
  const { rankings, sessions, players } = useRankings();

  const handleScroll = () => {
    document.getElementById('rankings-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Top 4 from real data, with skeleton fallback while loading
  const topFour = rankings.slice(0, 4);
  const phoneRows = topFour.length > 0
    ? topFour.map((r, i) => ({
        rank: r.rank,
        name: r.player_name,
        score: r.total_points,
        sessions: r.sessions_played,
        avatarUrl: r.avatar_url,
        cropX: r.avatar_crop_x ?? 0.5,
        cropY: r.avatar_crop_y ?? 0.5,
        tint: i % 2 === 0,
      }))
    : Array.from({ length: 4 }).map((_, i) => ({
        rank: i + 1,
        name: '',
        score: 0,
        sessions: 0,
        avatarUrl: null as string | null,
        cropX: 0.5,
        cropY: 0.5,
        tint: i % 2 === 0,
      }));

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="relative w-full overflow-hidden bg-background border-b-2 border-foreground">
      <div className="relative z-10 container py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left: headline + CTA */}
          <div className="md:col-span-7">
            <h1 className="font-display text-foreground leading-[0.9] tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6">
              <span className="sm:hidden">
                <span className="lime-slab">2026</span>
                <br />
                羽球人赛
                <br />
                <span className="lime-slab">积分榜.</span>
              </span>
              <span className="hidden sm:inline">
                {t.home.heroTitle.split(' ').map((word, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <span key={i}>
                      {isLast ? <span className="lime-slab">{word}.</span> : <>{word} </>}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-accent font-medium uppercase tracking-wider max-w-2xl mb-5">
              {t.home.heroSubtitle}
            </p>

            {/* Live stat chip */}
            {(players.length > 0 || sessions.length > 0) && (
              <div className="inline-flex items-center gap-2 mb-8 border-2 border-foreground rounded-md px-3 py-1.5 bg-background">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-display text-xs sm:text-sm tracking-wider text-foreground">
                  {players.length} PLAYERS · {sessions.length} SESSIONS
                </span>
              </div>
            )}

            <div>
              <button
                onClick={handleScroll}
                className="btn-pop inline-flex items-center gap-3 bg-accent text-accent-foreground border-2 border-foreground px-6 py-3 font-display uppercase tracking-wide text-sm rounded-md"
              >
                {t.showcase.cta}
                <CircleArrow size={28} className="text-foreground" />
              </button>
            </div>
          </div>

          {/* Right: tilted phone mockup */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              className="relative bg-foreground rounded-[2.5rem] p-3 border-2 border-foreground shadow-[8px_8px_0_0_hsl(var(--accent))]"
              style={{ transform: 'rotate(-2deg)', width: 280 }}
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-full z-10" />

              {/* LIVE badge */}
              <div className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 bg-accent border-2 border-foreground rounded-md px-2 py-1 shadow-[3px_3px_0_0_hsl(var(--foreground))]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground" />
                </span>
                <span className="font-display text-[10px] tracking-widest text-accent-foreground">LIVE</span>
              </div>

              <div className="bg-background rounded-[2rem] pt-10 pb-5 px-3 space-y-2">
                {phoneRows.map((row) => (
                  <div
                    key={row.rank}
                    className={`flex items-center gap-3 rounded-2xl border-2 border-foreground px-3 py-3 ${
                      row.tint ? 'bg-accent' : 'bg-background'
                    }`}
                  >
                    <span className="font-display text-lg w-5 text-foreground">{row.rank}</span>
                    <div className="w-9 h-9 rounded-full bg-foreground/90 border-2 border-foreground flex items-center justify-center overflow-hidden shrink-0">
                      {row.avatarUrl ? (
                        <img
                          src={row.avatarUrl}
                          alt={row.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: `${(row.cropX ?? 0.5) * 100}% ${(row.cropY ?? 0.5) * 100}%` }}
                        />
                      ) : (
                        <span className="font-display text-[10px] text-background">
                          {row.name ? getInitials(row.name) : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {row.name ? (
                        <>
                          <div className="font-display text-xs text-foreground truncate uppercase tracking-wide">
                            {row.name}
                          </div>
                          <div className="text-[10px] text-foreground/60 font-medium">
                            {row.sessions} {t.ranking.sessions}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-2 w-20 bg-foreground/30 rounded-full animate-pulse" />
                          <div className="h-1.5 w-12 bg-foreground/20 rounded-full mt-1.5 animate-pulse" />
                        </>
                      )}
                    </div>
                    <span className="font-display text-base text-foreground bg-background border-2 border-foreground rounded-md px-2 py-0.5">
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
