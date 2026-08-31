import { ArrowDown, ArrowUp, Minus, Sparkles } from 'lucide-react';
import type { PlayerRanking } from '@/types/ranking';

export function RankDelta({ ranking }: { ranking: PlayerRanking }) {
  if (ranking.rank_change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-finished" aria-label={`Up ${ranking.rank_change}`}>
        <ArrowUp className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="text-xs font-black">{ranking.rank_change}</span>
      </span>
    );
  }

  if (ranking.rank_change < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-destructive" aria-label={`Down ${Math.abs(ranking.rank_change)}`}>
        <ArrowDown className="h-3.5 w-3.5" strokeWidth={3} />
        <span className="text-xs font-black">{Math.abs(ranking.rank_change)}</span>
      </span>
    );
  }

  if (ranking.is_new) {
    return <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={3} aria-label="New player" />;
  }

  return <Minus className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={3} aria-label="No rank change" />;
}
