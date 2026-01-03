import { Match, SetScore } from '@/types/match';
import { ScoreButton } from './ScoreButton';
import { StatusBadge } from './StatusBadge';
import { CourtBadge } from './CourtBadge';
import { cn } from '@/lib/utils';
import { RotateCcw, Play, Square, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AdminScorePanelProps {
  match: Match;
  onScoreChange: (team: 'A' | 'B', delta: number) => void;
  onStatusChange: (status: 'scheduled' | 'live' | 'finished') => void;
  onResetSet: () => void;
  onNewSet: () => void;
}

export function AdminScorePanel({ 
  match, 
  onScoreChange, 
  onStatusChange,
  onResetSet,
  onNewSet 
}: AdminScorePanelProps) {
  const currentSetData = match.sets.find(s => s.setNumber === match.currentSet);
  const currentScoreA = currentSetData?.teamAScore ?? 0;
  const currentScoreB = currentSetData?.teamBScore ?? 0;

  return (
    <div className="bg-card rounded-xl p-4 card-shadow space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CourtBadge court={match.court} />
          <span className="text-muted-foreground text-xs">
            Match #{match.matchNumber}
          </span>
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Current Set Indicator */}
      {match.status === 'live' && (
        <div className="text-center py-2 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">Set {match.currentSet}</span>
        </div>
      )}

      {/* Scoring Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Team A */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold text-center text-sm truncate w-full">
            {match.teamA.name}
          </p>
          <div className="flex items-center gap-2">
            <ScoreButton 
              type="decrement" 
              onClick={() => onScoreChange('A', -1)}
              disabled={match.status !== 'live' || currentScoreA <= 0}
            />
            <div className="w-20 h-20 rounded-xl bg-score-bg flex items-center justify-center">
              <span className="font-display text-5xl">{currentScoreA}</span>
            </div>
            <ScoreButton 
              type="increment" 
              onClick={() => onScoreChange('A', 1)}
              disabled={match.status !== 'live' || currentScoreA >= 30}
            />
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold text-center text-sm truncate w-full">
            {match.teamB.name}
          </p>
          <div className="flex items-center gap-2">
            <ScoreButton 
              type="decrement" 
              onClick={() => onScoreChange('B', -1)}
              disabled={match.status !== 'live' || currentScoreB <= 0}
            />
            <div className="w-20 h-20 rounded-xl bg-score-bg flex items-center justify-center">
              <span className="font-display text-5xl">{currentScoreB}</span>
            </div>
            <ScoreButton 
              type="increment" 
              onClick={() => onScoreChange('B', 1)}
              disabled={match.status !== 'live' || currentScoreB >= 30}
            />
          </div>
        </div>
      </div>

      {/* Set History */}
      {match.sets.length > 0 && (
        <div className="flex justify-center gap-3 py-2">
          {match.sets.map((set) => (
            <div 
              key={set.setNumber}
              className={cn(
                'text-center px-3 py-1 rounded-lg bg-muted',
                set.setNumber === match.currentSet && match.status === 'live' && 'ring-2 ring-live'
              )}
            >
              <div className="text-[10px] text-muted-foreground mb-0.5">S{set.setNumber}</div>
              <div className="font-display text-lg">
                {set.teamAScore}-{set.teamBScore}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {match.status === 'scheduled' && (
          <Button 
            onClick={() => onStatusChange('live')}
            className="col-span-2 h-12 bg-live hover:bg-live/90 text-primary-foreground"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Match
          </Button>
        )}

        {match.status === 'live' && (
          <>
            <Button 
              variant="secondary"
              onClick={onResetSet}
              className="h-12"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Set
            </Button>
            <Button 
              variant="secondary"
              onClick={onNewSet}
              className="h-12"
              disabled={match.currentSet >= 3}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Set
            </Button>
            <Button 
              onClick={() => onStatusChange('finished')}
              className="col-span-2 h-12 bg-finished hover:bg-finished/90 text-accent-foreground"
            >
              <Square className="w-4 h-4 mr-2" />
              End Match
            </Button>
          </>
        )}

        {match.status === 'finished' && (
          <Button 
            onClick={() => onStatusChange('live')}
            variant="secondary"
            className="col-span-2 h-12"
          >
            Reopen Match
          </Button>
        )}
      </div>
    </div>
  );
}
