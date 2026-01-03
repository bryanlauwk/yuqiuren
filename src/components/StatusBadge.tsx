import { MatchStatus } from '@/types/match';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: MatchStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
        status === 'live' && 'bg-live/20 text-live',
        status === 'scheduled' && 'bg-scheduled/20 text-scheduled',
        status === 'finished' && 'bg-finished/20 text-finished',
        className
      )}
    >
      {status === 'live' && (
        <span className="w-2 h-2 rounded-full bg-live live-pulse" />
      )}
      {status}
    </div>
  );
}
