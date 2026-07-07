import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PlayerRanking } from '@/types/ranking';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  playerCount?: number;
  latestSessionDate?: string | null;
}

// 12-col grid template shared by header + all rows for perfect column alignment.
const GRID = 'grid grid-cols-[64px_minmax(0,1fr)_96px_96px_120px] gap-4';

export function DesktopRankingTable({
  rankings,
  onAvatarClick,
  playerCount,
  latestSessionDate,
}: DesktopRankingTableProps) {
  const { t, language } = useLanguage();

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const rankChange = (r: PlayerRanking) => {
    if (r.rank_change > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-finished font-broadcast font-bold text-xs">
          <ArrowUp className="w-3 h-3" strokeWidth={3} />
          {r.rank_change}
        </span>
      );
    }
    if (r.rank_change < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-destructive font-broadcast font-bold text-xs">
          <ArrowDown className="w-3 h-3" strokeWidth={3} />
          {Math.abs(r.rank_change)}
        </span>
      );
    }
    if (!r.is_new) {
      return (
        <span className="inline-flex items-center text-muted-foreground">
          <Minus className="w-3 h-3" strokeWidth={3} />
        </span>
      );
    }
    return null;
  };

  const medalColor = (rank: number) => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    return 'rank-bronze';
  };

  const topThree = rankings.filter(r => r.rank <= 3);
  const rest = rankings.filter(r => r.rank > 3);

  return (
    <div className="rounded bg-card border-2 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          GRID,
          'px-6 py-2.5 bg-foreground text-background border-b-2 border-primary',
          'text-[10px] font-broadcast font-bold tracking-[0.2em] uppercase'
        )}
      >
        <div>Rank <span className="opacity-40 ml-1">排名</span></div>
        <div>Player <span className="opacity-40 ml-1">选手</span></div>
        <div className="text-center">{language === 'zh' ? '场次' : 'Sessions'} <span className="opacity-40 ml-1">{language === 'zh' ? 'S' : '场次'}</span></div>
        <div className="text-center">{language === 'zh' ? '胜' : 'Wins'} <span className="opacity-40 ml-1">{language === 'zh' ? 'W' : '胜'}</span></div>
        <div className="text-right">{language === 'zh' ? '积分' : 'Points'} <span className="opacity-40 ml-1">{language === 'zh' ? 'PTS' : '积分'}</span></div>
      </div>

      {/* Top 3 — oversized broadcast rows */}
      <div>
        {topThree.map((r) => {
          const color = medalColor(r.rank);
          const isFirst = r.rank === 1;
          const height = isFirst ? 'h-[120px]' : 'h-[108px]';
          const avatarSize = isFirst ? 'w-16 h-16' : 'w-14 h-14';
          const nameSize = isFirst ? 'text-3xl' : 'text-2xl';
          const pointsSize = isFirst ? 'text-4xl' : 'text-3xl';
          const rankSize = isFirst ? 'text-6xl' : 'text-5xl';

          return (
            <div
              key={r.player_id}
              className={cn(
                GRID,
                'relative items-center px-6 border-b-2 border-foreground/10 group',
                'transition-colors',
                height,
              )}
              style={{
                background: `linear-gradient(to right, hsl(var(--${color}) / 0.10), transparent 55%)`,
                borderLeft: `6px solid hsl(var(--${color}))`,
              }}
            >
              {/* Rank number */}
              <div
                className={cn(
                  'font-broadcast font-black italic leading-none tabular-nums',
                  rankSize,
                )}
                style={{ color: `hsl(var(--${color}))` }}
              >
                {String(r.rank).padStart(2, '0')}
              </div>

              {/* Player */}
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() =>
                    r.full_avatar_url && onAvatarClick?.(r.full_avatar_url, r.player_name)
                  }
                  disabled={!r.full_avatar_url}
                  className={cn(
                    'flex-shrink-0 rounded-full overflow-hidden bg-muted border-2 transition-transform',
                    avatarSize,
                    r.full_avatar_url && 'cursor-pointer hover:-translate-y-0.5',
                  )}
                  style={{ borderColor: `hsl(var(--${color}))` }}
                >
                  {r.avatar_url ? (
                    <img
                      src={r.avatar_url}
                      alt={r.player_name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition:
                          r.avatar_crop_x !== null && r.avatar_crop_y !== null
                            ? `${(r.avatar_crop_x ?? 0.5) * 100}% ${(r.avatar_crop_y ?? 0.5) * 100}%`
                            : 'center',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-foreground text-sm font-black">
                      {getInitials(r.player_name)}
                    </div>
                  )}
                </button>

                <div className="min-w-0">
                  <div
                    className={cn(
                      'font-broadcast font-black uppercase italic tracking-tight text-foreground leading-none truncate',
                      nameSize,
                    )}
                  >
                    {r.player_name}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {isFirst && (
                      <span className="inline-block bg-primary text-primary-foreground text-[9px] font-broadcast font-black tracking-widest px-1.5 py-0.5 -skew-x-12 uppercase">
                        MVP
                      </span>
                    )}
                    {rankChange(r)}
                    {r.is_new && (
                      <span className="text-[10px] font-broadcast font-bold uppercase text-muted-foreground tracking-widest">
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sessions */}
              <div className="text-center font-broadcast font-black italic text-2xl text-foreground tabular-nums">
                {r.sessions_played}
              </div>

              {/* Wins */}
              <div className="text-center font-broadcast font-black italic text-2xl text-foreground tabular-nums">
                {r.championships}
              </div>

              {/* Points */}
              <div
                className={cn(
                  'text-right font-broadcast font-black italic tabular-nums leading-none',
                  pointsSize,
                )}
                style={{ color: `hsl(var(--${color}))` }}
              >
                {r.total_points}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact rows 4+ */}
      <div>
        {rest.map((r, i) => (
          <div
            key={r.player_id}
            className={cn(
              GRID,
              'items-center px-6 h-11 border-b border-foreground/5 transition-colors group',
              'hover:bg-muted',
              i % 2 === 0 ? 'bg-transparent' : 'bg-muted/40',
            )}
          >
            <div className="font-broadcast font-bold italic text-sm tracking-widest text-muted-foreground tabular-nums">
              {String(r.rank).padStart(2, '0')}
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() =>
                  r.full_avatar_url && onAvatarClick?.(r.full_avatar_url, r.player_name)
                }
                disabled={!r.full_avatar_url}
                className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-full overflow-hidden bg-muted border border-foreground/30',
                  r.full_avatar_url && 'cursor-pointer hover:border-primary',
                )}
              >
                {r.avatar_url ? (
                  <img
                    src={r.avatar_url}
                    alt={r.player_name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition:
                        r.avatar_crop_x !== null && r.avatar_crop_y !== null
                          ? `${(r.avatar_crop_x ?? 0.5) * 100}% ${(r.avatar_crop_y ?? 0.5) * 100}%`
                          : 'center',
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground text-[9px] font-black">
                    {getInitials(r.player_name)}
                  </div>
                )}
              </button>
              <span className="font-broadcast font-bold text-sm uppercase tracking-wider text-foreground truncate group-hover:text-primary transition-colors">
                {r.player_name}
              </span>
              <span className="flex-shrink-0">{rankChange(r)}</span>
              {r.is_new && (
                <span className="text-[9px] font-broadcast font-bold uppercase text-muted-foreground tracking-widest flex-shrink-0">
                  NEW
                </span>
              )}
            </div>

            <div className="text-center font-broadcast font-bold text-sm text-muted-foreground tabular-nums">
              {r.sessions_played}
            </div>
            <div className="text-center font-broadcast font-bold text-sm text-muted-foreground tabular-nums">
              {r.championships}
            </div>
            <div className="text-right font-broadcast font-black italic text-base text-foreground tabular-nums tracking-tight">
              {r.total_points}
            </div>
          </div>
        ))}
      </div>

      {/* Live footer strip */}
      <div className="px-6 py-2.5 bg-foreground/[0.03] border-t-2 border-foreground/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] font-broadcast font-bold tracking-[0.2em] uppercase text-muted-foreground">
            {language === 'zh' ? '实时数据' : 'Live Standings'}
          </span>
          {typeof playerCount === 'number' && (
            <span className="text-[10px] font-broadcast font-bold tracking-widest uppercase text-muted-foreground/70">
              · {playerCount}{language === 'zh' ? ' 名选手' : ' Players'}
            </span>
          )}
        </div>
        {latestSessionDate && (
          <span className="text-[10px] font-broadcast font-bold italic tracking-widest uppercase text-primary">
            {language === 'zh' ? '最近场次' : 'Latest'} · {latestSessionDate}
          </span>
        )}
      </div>
    </div>
  );
}
