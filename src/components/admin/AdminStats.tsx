import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';
import type { Player, TournamentSession, SessionResult } from '@/types/ranking';

interface AdminStatsProps {
  players: Player[];
  sessions: TournamentSession[];
  results: SessionResult[];
}

export function AdminStats({ players, sessions, results }: AdminStatsProps) {
  const totalPoints = results.reduce((sum, r) => sum + r.total_points, 0);
  const totalChampions = results.filter(r => r.result_type === 'champion').length;

  const stats = [
    {
      label: 'Total Players',
      value: players.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Sessions Played',
      value: sessions.length,
      icon: Calendar,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      label: 'Championships',
      value: totalChampions,
      icon: Trophy,
      color: 'text-champion',
      bgColor: 'bg-champion/10',
    },
    {
      label: 'Points Awarded',
      value: totalPoints,
      icon: TrendingUp,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
