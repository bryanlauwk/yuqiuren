import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

interface Props {
  rotate: number;
  translateY: number;
}

export function StarOfTheWeek({ rotate, translateY }: Props) {
  const { t, language } = useLanguage();
  const { rankings, sessions, results, players, loading } = useRankings();

  const data = useMemo(() => {
    if (!rankings.length) return null;

    // Try the latest session champion first
    const latestSession = sessions[0];
    let primaryPlayerId: string | undefined;
    let pointsThisMatch = 0;
    let coChampionNames: string[] = [];
    let dateLabel: string | null = null;
    let matchIndex: number | null = null;

    if (latestSession) {
      const sessionChamps = results.filter(
        (r) => r.session_id === latestSession.id && r.result_type === 'champion'
      );
      if (sessionChamps.length > 0) {
        // pick the highest-ranked champion as the focal point
        const sorted = [...sessionChamps].sort((a, b) => {
          const ra = rankings.find((r) => r.player_id === a.player_id)?.rank ?? 999;
          const rb = rankings.find((r) => r.player_id === b.player_id)?.rank ?? 999;
          return ra - rb;
        });
        primaryPlayerId = sorted[0].player_id;
        pointsThisMatch = sorted[0].total_points;
        coChampionNames = sorted
          .slice(1)
          .map((c) => players.find((p) => p.id === c.player_id)?.name)
          .filter(Boolean) as string[];
        dateLabel = latestSession.session_date;
        // session # = total sessions - index in sorted-desc list, so latest is the highest number
        matchIndex = sessions.length;
      }
    }

    // Fallback: season #1
    if (!primaryPlayerId) {
      primaryPlayerId = rankings[0].player_id;
    }

    const star = rankings.find((r) => r.player_id === primaryPlayerId);
    if (!star) return null;

    return {
      star,
      pointsThisMatch,
      coChampionNames,
      dateLabel,
      matchIndex,
      isFallback: !dateLabel,
    };
  }, [rankings, sessions, results, players]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  };

  return (
    <div
      className="relative bg-background border-2 border-foreground rounded-2xl shadow-[8px_8px_0_0_hsl(var(--accent))] transition-transform duration-200 ease-out will-change-transform overflow-hidden"
      style={{
        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
        width: 340,
      }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground text-background px-4 py-2">
        <span className="font-display text-[11px] tracking-[0.25em]">
          {language === 'zh' ? '本周之星' : 'STAR OF THE WEEK'}
        </span>
        <span className="flex items-center gap-1.5 bg-accent text-accent-foreground border-2 border-background rounded-md px-1.5 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-background opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background" />
          </span>
          <span className="font-display text-[9px] tracking-widest">LIVE</span>
        </span>
      </div>

      {/* Big avatar block with diagonal accent slab */}
      <div className="relative bg-muted aspect-square w-full overflow-hidden border-b-2 border-foreground">
        {/* Diagonal accent stripe */}
        <div
          className="absolute inset-0 bg-accent"
          style={{ clipPath: 'polygon(0 60%, 100% 20%, 100% 100%, 0 100%)' }}
        />
        {/* Halo behind portrait */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] aspect-square rounded-full bg-background border-2 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
            {loading || !data ? (
              <div className="w-full h-full animate-pulse-arena bg-muted" />
            ) : data.star.full_avatar_url || data.star.avatar_url ? (
              <img
                src={data.star.full_avatar_url || data.star.avatar_url || ''}
                alt={data.star.player_name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${(data.star.avatar_crop_x ?? 0.5) * 100}% ${(data.star.avatar_crop_y ?? 0.5) * 100}%`,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-6xl text-foreground">
                {getInitials(data.star.player_name)}
              </div>
            )}
          </div>
        </div>
        {/* Corner rank tag */}
        {data && (
          <div className="absolute top-3 left-3 bg-background border-2 border-foreground rounded-md px-2 py-1 font-display text-sm shadow-[3px_3px_0_0_hsl(var(--foreground))]">
            #{data.star.rank}
          </div>
        )}
      </div>

      {/* Name + meta */}
      <div className="p-4 space-y-3">
        <div>
          <div className="font-display text-2xl leading-tight text-foreground uppercase tracking-tight break-words">
            {data ? (
              <span className="lime-slab">{data.star.player_name}</span>
            ) : (
              <span className="inline-block h-7 w-40 bg-muted animate-pulse-arena rounded" />
            )}
          </div>
          <div className="mt-1 font-display text-[11px] tracking-[0.2em] text-muted-foreground">
            {data?.isFallback
              ? language === 'zh'
                ? '赛季领跑者'
                : 'SEASON LEADER'
              : language === 'zh'
                ? `本场冠军 · 第 ${data?.matchIndex} 场`
                : `MATCH CHAMPION · #${data?.matchIndex}`}
          </div>
        </div>

        {/* Stat trio */}
        <div className="grid grid-cols-3 gap-2">
          <StatBox
            value={data ? (data.isFallback ? data.star.total_points : data.pointsThisMatch) : '—'}
            label={data?.isFallback ? (language === 'zh' ? '总分' : 'PTS') : (language === 'zh' ? '本场' : 'MATCH')}
            tint="accent"
          />
          <StatBox
            value={data ? data.star.championships : '—'}
            label={language === 'zh' ? '冠军' : 'TITLES'}
            tint="primary"
          />
          <StatBox
            value={data ? data.star.sessions_played : '—'}
            label={language === 'zh' ? '出场' : 'PLAYED'}
            tint="muted"
          />
        </div>

        {/* Footer line */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-foreground/10">
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">
            {data?.dateLabel ? formatDate(data.dateLabel) : '—'}
          </span>
          {data && data.coChampionNames.length > 0 && (
            <span className="font-display text-[9px] tracking-wider text-muted-foreground truncate max-w-[60%] text-right">
              & {data.coChampionNames.join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  value,
  label,
  tint,
}: {
  value: number | string;
  label: string;
  tint: 'accent' | 'primary' | 'muted';
}) {
  const bg =
    tint === 'accent'
      ? 'bg-accent text-accent-foreground'
      : tint === 'primary'
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-foreground';
  return (
    <div className={`border-2 border-foreground rounded-md px-2 py-2 text-center ${bg}`}>
      <div className="font-display text-xl leading-none">{value}</div>
      <div className="font-display text-[9px] tracking-[0.15em] mt-1 opacity-90">{label}</div>
    </div>
  );
}
