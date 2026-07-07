import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Player, TournamentSession, SessionResult } from '@/types/ranking';

interface AdminStatsProps {
  players: Player[];
  sessions: TournamentSession[];
  results: SessionResult[];
}

export function AdminStats({ players, sessions, results }: AdminStatsProps) {
  const { t } = useLanguage();
  const totalPoints = results.reduce((sum, r) => sum + r.total_points, 0);
  const totalChampions = results.filter(r => r.result_type === 'champion').length;

  const stats = [
    {
      label: t.admin.totalPlayers,
      value: players.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: t.admin.sessionsPlayed,
      value: sessions.length,
      icon: Calendar,
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
    {
      label: t.admin.championships,
      value: totalChampions,
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: t.admin.pointsAwarded,
      value: totalPoints,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border-2 border-foreground rounded p-4 shadow-[3px_3px_0_0_hsl(var(--foreground))] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))]"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border-2 border-foreground ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="font-display text-2xl text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}