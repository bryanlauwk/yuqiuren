import { Match } from '@/types/match';
import { StatusBadge } from './StatusBadge';
import { CourtBadge } from './CourtBadge';
import { SetScoreDisplay } from './SetScoreDisplay';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const setsWonA = match.sets.filter(s => s.teamAScore > s.teamBScore).length;
  const setsWonB = match.sets.filter(s => s.teamBScore > s.teamAScore).length;

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card rounded-xl p-4 card-shadow animate-fade-in cursor-pointer transition-all',
        'hover:bg-card/80 active:scale-[0.98]',
        match.status === 'live' && 'ring-1 ring-live/30'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CourtBadge court={match.court} />
          <span className="text-muted-foreground text-xs">
            Match #{match.matchNumber}
          </span>
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3">
        {/* Team A */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className={cn(
              'font-semibold truncate',
              match.status === 'finished' && setsWonA > setsWonB && 'text-finished'
            )}>
              {match.teamA.name}
            </p>
          </div>
          {match.status !== 'scheduled' && (
            <div className="flex items-center gap-3 ml-3">
              <span className={cn(
                'font-display text-3xl',
                match.status === 'finished' && setsWonA > setsWonB && 'text-finished'
              )}>
                {setsWonA}
              </span>
            </div>
          )}
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className={cn(
              'font-semibold truncate',
              match.status === 'finished' && setsWonB > setsWonA && 'text-finished'
            )}>
              {match.teamB.name}
            </p>
          </div>
          {match.status !== 'scheduled' && (
            <div className="flex items-center gap-3 ml-3">
              <span className={cn(
                'font-display text-3xl',
                match.status === 'finished' && setsWonB > setsWonA && 'text-finished'
              )}>
                {setsWonB}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Set Scores */}
      <div className="mt-4 pt-4 border-t border-border">
        <SetScoreDisplay 
          sets={match.sets} 
          currentSet={match.currentSet}
          isLive={match.status === 'live'}
        />
      </div>

      {/* Time Info */}
      <div className="mt-3 text-xs text-muted-foreground">
        {match.status === 'scheduled' && (
          <span>Scheduled: {format(match.scheduledTime, 'h:mm a')}</span>
        )}
        {match.status === 'live' && match.startedAt && (
          <span>Started: {format(match.startedAt, 'h:mm a')}</span>
        )}
        {match.status === 'finished' && match.finishedAt && (
          <span>Finished: {format(match.finishedAt, 'h:mm a')}</span>
        )}
      </div>
    </div>
  );
}
