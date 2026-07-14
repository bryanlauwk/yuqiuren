import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import type { PlayerRanking, SessionResult, TournamentSession, Player } from '@/types/ranking';

interface Props {
  rotate: number;
  translateY: number;
}

type AwardKey =
  | 'champion'
  | 'leader'
  | 'rookie'
  | 'climber'
  | 'iron_man'
  | 'hot_streak'
  | 'potential';

type Tint = 'accent' | 'primary' | 'finished' | 'destructive' | 'muted';

interface AwardResult {
  key: AwardKey;
  player: PlayerRanking;
  headlineZh: string;
  headlineEn: string;
  subtitleZh: string;
  subtitleEn: string;
  statValue: number | string;
  statLabelZh: string;
  statLabelEn: string;
  tint: Tint;
  coNames: string[];
  dateLabel: string | null;
  matchIndex: number | null;
}

function isoWeek(d = new Date()): number {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

function computeCandidates(
  rankings: PlayerRanking[],
  sessions: TournamentSession[],
  results: SessionResult[],
  players: Player[],
): AwardResult[] {
  const out: AwardResult[] = [];
  if (!rankings.length) return out;

  const rankOf = (pid: string) =>
    rankings.find((r) => r.player_id === pid)?.rank ?? 999;
  const findRanking = (pid: string) =>
    rankings.find((r) => r.player_id === pid);

  // 1. Champion of latest session
  const latest = sessions[0];
  if (latest) {
    const champs = results.filter(
      (r) => r.session_id === latest.id && r.result_type === 'champion',
    );
    if (champs.length) {
      const sorted = [...champs].sort(
        (a, b) => rankOf(a.player_id) - rankOf(b.player_id),
      );
      const primary = findRanking(sorted[0].player_id);
      if (primary) {
        const coNames = sorted
          .slice(1)
          .map((c) => players.find((p) => p.id === c.player_id)?.name)
          .filter(Boolean) as string[];
        out.push({
          key: 'champion',
          player: primary,
          headlineZh: '本场冠军',
          headlineEn: 'MATCH CHAMPION',
          subtitleZh: `第 ${sessions.length} 场夺冠`,
          subtitleEn: `WON MATCH #${sessions.length}`,
          statValue: sorted[0].total_points,
          statLabelZh: '本场',
          statLabelEn: 'MATCH',
          tint: 'accent',
          coNames,
          dateLabel: latest.session_date,
          matchIndex: sessions.length,
        });
      }
    }
  }

  // 2. Season leader
  const leader = rankings[0];
  if (leader) {
    out.push({
      key: 'leader',
      player: leader,
      headlineZh: '赛季领跑者',
      headlineEn: 'SEASON LEADER',
      subtitleZh: '本季积分榜首',
      subtitleEn: 'TOP OF THE TABLE',
      statValue: leader.total_points,
      statLabelZh: '总分',
      statLabelEn: 'PTS',
      tint: 'accent',
      coNames: [],
      dateLabel: null,
      matchIndex: null,
    });
  }

  // 3. Rookie: is_new === true, highest points
  const rookies = rankings
    .filter((r) => r.is_new)
    .sort((a, b) => b.total_points - a.total_points);
  if (rookies[0]) {
    out.push({
      key: 'rookie',
      player: rookies[0],
      headlineZh: '最佳新人',
      headlineEn: 'TOP ROOKIE',
      subtitleZh: '本季首次登场表现亮眼',
      subtitleEn: 'STRONG DEBUT SEASON',
      statValue: rookies[0].total_points,
      statLabelZh: '积分',
      statLabelEn: 'PTS',
      tint: 'primary',
      coNames: [],
      dateLabel: null,
      matchIndex: null,
    });
  }

  // 4. Climber: biggest positive rank_change
  const climbers = rankings
    .filter((r) => r.rank_change > 0)
    .sort((a, b) => b.rank_change - a.rank_change);
  if (climbers[0]) {
    out.push({
      key: 'climber',
      player: climbers[0],
      headlineZh: '最佳进步',
      headlineEn: 'TOP CLIMBER',
      subtitleZh: `本周上升 ${climbers[0].rank_change} 位`,
      subtitleEn: `UP ${climbers[0].rank_change} SPOTS`,
      statValue: `+${climbers[0].rank_change}`,
      statLabelZh: '升幅',
      statLabelEn: 'RISE',
      tint: 'finished',
      coNames: [],
      dateLabel: null,
      matchIndex: null,
    });
  }

  // 5. Iron man: most sessions played, exclude #1
  const iron = [...rankings]
    .filter((r) => r.rank !== 1)
    .sort((a, b) => b.sessions_played - a.sessions_played)[0];
  if (iron && iron.sessions_played >= 3) {
    out.push({
      key: 'iron_man',
      player: iron,
      headlineZh: '全勤铁人',
      headlineEn: 'IRON MAN',
      subtitleZh: `已出场 ${iron.sessions_played} 场`,
      subtitleEn: `${iron.sessions_played} SESSIONS PLAYED`,
      statValue: iron.sessions_played,
      statLabelZh: '出场',
      statLabelEn: 'PLAYED',
      tint: 'muted',
      coNames: [],
      dateLabel: null,
      matchIndex: null,
    });
  }

  // 6. Hot streak: consecutive championships from most-recent sessions
  //    For each player, count how many of the most-recent-consecutive
  //    sessions they were a champion in.
  const orderedSessions = [...sessions].sort((a, b) =>
    b.session_date.localeCompare(a.session_date),
  );
  const streakMap = new Map<string, number>();
  for (const p of rankings) {
    let streak = 0;
    for (const s of orderedSessions) {
      const won = results.some(
        (r) =>
          r.session_id === s.id &&
          r.player_id === p.player_id &&
          r.result_type === 'champion',
      );
      if (won) streak++;
      else break;
    }
    if (streak >= 2) streakMap.set(p.player_id, streak);
  }
  const hotEntry = [...streakMap.entries()].sort((a, b) => b[1] - a[1])[0];
  if (hotEntry) {
    const hot = findRanking(hotEntry[0]);
    if (hot) {
      out.push({
        key: 'hot_streak',
        player: hot,
        headlineZh: '连冠热浪',
        headlineEn: 'HOT STREAK',
        subtitleZh: `连续 ${hotEntry[1]} 场夺冠`,
        subtitleEn: `${hotEntry[1]} WINS IN A ROW`,
        statValue: `x${hotEntry[1]}`,
        statLabelZh: '连冠',
        statLabelEn: 'STREAK',
        tint: 'destructive',
        coNames: [],
        dateLabel: null,
        matchIndex: null,
      });
    }
  }

  // 7. Potential: sessions_played between 1 and 3, highest avg points
  const potentials = rankings
    .filter((r) => r.sessions_played >= 1 && r.sessions_played <= 3)
    .map((r) => ({ r, avg: r.total_points / r.sessions_played }))
    .sort((a, b) => b.avg - a.avg);
  if (potentials[0] && potentials[0].r.player_id !== leader?.player_id) {
    const { r, avg } = potentials[0];
    out.push({
      key: 'potential',
      player: r,
      headlineZh: '最具潜质',
      headlineEn: 'RISING TALENT',
      subtitleZh: `场均 ${avg.toFixed(1)} 分`,
      subtitleEn: `${avg.toFixed(1)} PTS / MATCH`,
      statValue: avg.toFixed(1),
      statLabelZh: '场均',
      statLabelEn: 'AVG',
      tint: 'primary',
      coNames: [],
      dateLabel: null,
      matchIndex: null,
    });
  }

  return out;
}

const tintClasses: Record<Tint, { stripe: string; stat: string }> = {
  accent: {
    stripe: 'bg-accent',
    stat: 'bg-accent text-accent-foreground',
  },
  primary: {
    stripe: 'bg-primary',
    stat: 'bg-primary text-primary-foreground',
  },
  finished: {
    stripe: 'bg-[hsl(var(--finished))]',
    stat: 'bg-[hsl(var(--finished))] text-background',
  },
  destructive: {
    stripe: 'bg-destructive',
    stat: 'bg-destructive text-destructive-foreground',
  },
  muted: {
    stripe: 'bg-foreground',
    stat: 'bg-foreground text-background',
  },
};

export function StarOfTheWeek({ rotate, translateY }: Props) {
  const { language } = useLanguage();
  const { rankings, sessions, results, players, loading } = useRankings();

  const award = useMemo<AwardResult | null>(() => {
    const candidates = computeCandidates(rankings, sessions, results, players);
    if (!candidates.length) return null;
    const week = isoWeek();
    return candidates[week % candidates.length];
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

  const tint = award ? tintClasses[award.tint] : tintClasses.accent;

  return (
    <div
      key={award?.key ?? 'loading'}
      className="relative bg-background border-2 border-foreground rounded-2xl shadow-[8px_8px_0_0_hsl(var(--accent))] transition-transform duration-200 ease-out will-change-transform overflow-hidden animate-fade-in-up"
      style={{
        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
        width: 340,
      }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground text-background px-4 py-2 gap-3">
        <span className="font-display text-[11px] tracking-[0.25em] truncate">
          {award
            ? language === 'zh'
              ? award.headlineZh
              : award.headlineEn
            : language === 'zh'
              ? '本周之星'
              : 'STAR OF THE WEEK'}
        </span>
        <span className="flex items-center gap-1.5 bg-accent text-accent-foreground border-2 border-background rounded-md px-1.5 py-0.5 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-background opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background" />
          </span>
          <span className="font-display text-[9px] tracking-widest">LIVE</span>
        </span>
      </div>

      {/* Big avatar block with diagonal accent slab */}
      <div className="relative bg-muted aspect-square w-full overflow-hidden border-b-2 border-foreground">
        <div
          className={`absolute inset-0 ${tint.stripe}`}
          style={{ clipPath: 'polygon(0 60%, 100% 20%, 100% 100%, 0 100%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[78%] aspect-square rounded-full bg-background border-2 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
            {loading || !award ? (
              <div className="w-full h-full animate-pulse-arena bg-muted" />
            ) : award.player.full_avatar_url || award.player.avatar_url ? (
              <img
                src={award.player.full_avatar_url || award.player.avatar_url || ''}
                alt={award.player.player_name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${(award.player.avatar_crop_x ?? 0.5) * 100}% ${(award.player.avatar_crop_y ?? 0.5) * 100}%`,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display text-6xl text-foreground">
                {getInitials(award.player.player_name)}
              </div>
            )}
          </div>
        </div>
        {award && (
          <div className="absolute top-3 left-3 bg-background border-2 border-foreground rounded-md px-2 py-1 font-display text-sm shadow-[3px_3px_0_0_hsl(var(--foreground))]">
            #{award.player.rank}
          </div>
        )}
      </div>

      {/* Name + meta */}
      <div className="p-4 space-y-3">
        <div>
          <div className="font-display text-2xl leading-tight text-foreground uppercase tracking-tight break-words min-h-[28px]">
            {award ? (
              <span className="lime-slab">{award.player.player_name}</span>
            ) : (
              <span className="inline-block h-7 w-40 bg-muted animate-pulse-arena rounded" />
            )}
          </div>
          <div className="mt-1 font-display text-[11px] tracking-[0.2em] text-muted-foreground min-h-[14px]">
            {!award ? (
              <span className="inline-block h-3 w-32 bg-muted animate-pulse-arena rounded" />
            ) : language === 'zh' ? (
              award.subtitleZh
            ) : (
              award.subtitleEn
            )}
          </div>
        </div>

        {/* Stat trio */}
        <div className="grid grid-cols-3 gap-2">
          <StatBox
            value={award ? award.statValue : null}
            label={
              award
                ? language === 'zh'
                  ? award.statLabelZh
                  : award.statLabelEn
                : ''
            }
            className={tint.stat}
          />
          <StatBox
            value={award ? award.player.championships : null}
            label={language === 'zh' ? '冠军' : 'TITLES'}
            className="bg-primary text-primary-foreground"
          />
          <StatBox
            value={award ? award.player.sessions_played : null}
            label={language === 'zh' ? '出场' : 'PLAYED'}
            className="bg-muted text-foreground"
          />
        </div>

        {/* Footer line */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-foreground/10 min-h-[18px]">
          <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">
            {!award ? (
              <span className="inline-block h-2.5 w-16 bg-muted animate-pulse-arena rounded" />
            ) : award.dateLabel ? (
              formatDate(award.dateLabel)
            ) : (
              language === 'zh' ? '赛季累计' : 'SEASON TOTAL'
            )}
          </span>
          {award && award.coNames.length > 0 && (
            <span className="font-display text-[9px] tracking-wider text-muted-foreground truncate max-w-[60%] text-right">
              & {award.coNames.join(', ')}
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
  className,
}: {
  value: number | string | null;
  label: string;
  className: string;
}) {
  return (
    <div className={`border-2 border-foreground rounded-md px-2 py-2 text-center ${className}`}>
      <div className="font-display text-xl leading-none min-h-[20px] flex items-center justify-center">
        {value === null ? (
          <span className="inline-block h-4 w-6 bg-foreground/15 animate-pulse-arena rounded" />
        ) : (
          value
        )}
      </div>
      <div className="font-display text-[9px] tracking-[0.15em] mt-1 opacity-90">{label}</div>
    </div>
  );
}
