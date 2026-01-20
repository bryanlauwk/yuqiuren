import { forwardRef } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import logo from '@/assets/logo.png';
import type { PlayerRanking } from '@/types/ranking';

interface RankingShareCardProps {
  rankings: PlayerRanking[];
  brandName: string;
  subtitle: string;
}

export const RankingShareCard = forwardRef<HTMLDivElement, RankingShareCardProps>(
  ({ rankings, brandName, subtitle }, ref) => {
    const top10 = rankings.slice(0, 10);
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const getRankIcon = (rank: number) => {
      switch (rank) {
        case 1:
          return <Trophy className="w-5 h-5 text-yellow-400" />;
        case 2:
          return <Medal className="w-5 h-5 text-gray-300" />;
        case 3:
          return <Award className="w-5 h-5 text-amber-600" />;
        default:
          return null;
      }
    };

    const getRankStyle = (rank: number) => {
      switch (rank) {
        case 1:
          return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-l-4 border-yellow-400';
        case 2:
          return 'bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-l-4 border-gray-300';
        case 3:
          return 'bg-gradient-to-r from-amber-600/20 to-amber-700/10 border-l-4 border-amber-600';
        default:
          return 'bg-white/5 border-l-4 border-transparent';
      }
    };

    return (
      <div
        ref={ref}
        className="w-[400px] bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#4A0000] text-white p-0 font-sans"
        style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
      >
        {/* Header */}
        <div className="bg-black/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">{brandName}</h1>
              <p className="text-xs text-white/70">{subtitle}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60 uppercase tracking-wider">Updated</p>
            <p className="text-sm font-semibold">{today}</p>
          </div>
        </div>

        {/* Rankings List */}
        <div className="px-4 py-3 space-y-1.5">
          {top10.map((player) => (
            <div
              key={player.player_id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${getRankStyle(player.rank)}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 flex items-center justify-center">
                  {getRankIcon(player.rank) || (
                    <span className="text-lg font-bold text-white/60">{player.rank}</span>
                  )}
                </div>
                <span className={`font-semibold ${player.rank <= 3 ? 'text-white' : 'text-white/90'}`}>
                  {player.player_name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-lg font-bold ${player.rank <= 3 ? 'text-white' : 'text-white/80'}`}>
                  {player.total_points}
                </span>
                <span className="text-xs text-white/50">pts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-black/40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs">🏸 One Shamelin Badminton Hall</span>
          </div>
          <span className="text-xs text-white/50">yuqiuren.lovable.app</span>
        </div>
      </div>
    );
  }
);

RankingShareCard.displayName = 'RankingShareCard';
