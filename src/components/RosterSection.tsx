import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PlayerCard } from '@/components/PlayerCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { getAveragePoints, getBestChampionshipStreak, getInitials, getWinRate } from '@/lib/ranking-display';
import type { PlayerRanking } from '@/types/ranking';

interface RosterPlayer {
  ranking: PlayerRanking;
  bestStreak: number;
}

export function RosterSection() {
  const { rankings, sessions, results, loading } = useRankings();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const isZh = language === 'zh';
  const [selected, setSelected] = useState<RosterPlayer | null>(null);

  const roster = useMemo(
    () => rankings.map((ranking) => ({
      ranking,
      bestStreak: getBestChampionshipStreak(ranking.player_id, sessions, results),
    })),
    [rankings, results, sessions],
  );

  return (
    <section id="roster" className="relative overflow-hidden border-b-2 border-foreground bg-secondary py-14 scroll-mt-28 sm:py-20">
      <div className="brand-band absolute inset-x-0 top-0 h-2" />
      <div className="container">
        <Reveal>
          <SectionHeading
            variant="bar"
            kicker={isZh ? '球队阵容 · 2026 赛季' : 'TEAM ROSTER · 2026 SEASON'}
            title={isZh ? '2026 球员名册' : '2026 Player Roster'}
            className="mb-6"
            action={
              <span className="font-condensed text-3xl text-background sm:text-4xl">
                {String(rankings.length).padStart(2, '0')}
              </span>
            }
          />


          {loading ? (
            <div className="flex gap-4 overflow-hidden md:grid md:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-[24rem] w-[78vw] max-w-[19rem] shrink-0 animate-pulse-arena bg-muted md:w-full md:max-w-none" />
              ))}
            </div>
          ) : (
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 xl:grid-cols-4">
              {roster.map((player) => (
                <PlayerCard
                  key={player.ranking.player_id}
                  ranking={player.ranking}
                  bestStreak={player.bestStreak}
                  mobile={isMobile}
                  onSelect={() => setSelected(player)}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>

      <MobilePlayerDialog player={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function MobilePlayerDialog({ player, open, onClose }: { player: RosterPlayer | null; open: boolean; onClose: () => void }) {
  if (!player) return null;

  const { ranking, bestStreak } = player;
  const imageUrl = ranking.full_avatar_url || ranking.avatar_url;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="brand-surface h-[100dvh] w-screen max-w-none gap-0 overflow-y-auto rounded-none border-0 p-0 [&>button]:right-4 [&>button]:top-4 [&>button]:z-20 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:border [&>button]:border-[hsl(var(--band-foreground))]/50 [&>button]:bg-[hsl(var(--band-surface))]/75 [&>button]:text-[hsl(var(--band-foreground))] [&>button]:opacity-100">
        <DialogTitle className="sr-only">{ranking.player_name}</DialogTitle>

        <div className="relative h-[54dvh] min-h-80 overflow-hidden bg-primary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={ranking.player_name}
              className="h-full w-full object-cover"
              style={{ objectPosition: `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%` }}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-9xl text-primary-foreground/70">
              {getInitials(ranking.player_name)}
            </div>
          )}
          <div className="brand-photo-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[hsl(var(--band-foreground))]/60">YQR League · 2026</div>
            <div className="mt-1 font-display text-5xl leading-[0.88] band-fg">{ranking.player_name}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-[hsl(var(--band-foreground))]/20 m-5">
          <DialogStat label="场次 / GP" value={ranking.sessions_played} />
          <DialogStat label="胜率 / WIN%" value={`${getWinRate(ranking)}%`} />
          <DialogStat label="积分 / PTS" value={ranking.total_points} />
          <DialogStat label="排名 / RANK" value={`#${ranking.rank}`} />
          <DialogStat label="场均 / AVG" value={getAveragePoints(ranking)} />
          <DialogStat label="最佳连胜 / STREAK" value={bestStreak} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DialogStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-b border-r border-[hsl(var(--band-foreground))]/20 p-4">
      <div className="font-display text-4xl leading-none text-accent">{value}</div>
      <div className="mt-1 font-sans text-[8px] font-black uppercase tracking-[0.14em] text-[hsl(var(--band-foreground))]/55">{label}</div>
    </div>
  );
}
