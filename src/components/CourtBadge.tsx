import { cn } from '@/lib/utils';

interface CourtBadgeProps {
  court: number;
  className?: string;
}

export function CourtBadge({ court, className }: CourtBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-2 py-0.5 rounded bg-court/20 text-court text-xs font-medium',
        className
      )}
    >
      Court {court}
    </div>
  );
}
