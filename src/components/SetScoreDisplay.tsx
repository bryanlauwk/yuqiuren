import { SetScore } from '@/types/match';
import { cn } from '@/lib/utils';

interface SetScoreDisplayProps {
  sets: SetScore[];
  currentSet: number;
  isLive?: boolean;
}

export function SetScoreDisplay({ sets, currentSet, isLive }: SetScoreDisplayProps) {
  if (sets.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        Match not started
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {sets.map((set, index) => {
        const isCurrentSet = isLive && set.setNumber === currentSet;
        const teamAWins = set.teamAScore > set.teamBScore;
        const teamBWins = set.teamBScore > set.teamAScore;
        
        return (
          <div
            key={set.setNumber}
            className={cn(
              'flex flex-col items-center min-w-[40px] rounded-lg px-2 py-1.5 bg-score-bg',
              isCurrentSet && 'ring-2 ring-live glow-live'
            )}
          >
            <span className="text-[10px] text-muted-foreground uppercase mb-0.5">
              S{set.setNumber}
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <span className={cn(
                'font-display text-xl leading-none',
                teamAWins ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {set.teamAScore}
              </span>
              <span className="text-muted-foreground/50 text-[10px]">-</span>
              <span className={cn(
                'font-display text-xl leading-none',
                teamBWins ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {set.teamBScore}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
