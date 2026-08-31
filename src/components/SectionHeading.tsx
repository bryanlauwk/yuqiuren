import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  /** Render on a dark brand band */
  onBand?: boolean;
}

/**
 * Pro-league section header: small uppercase kicker + oversized condensed title.
 */
export function SectionHeading({ kicker, title, action, className, onBand }: SectionHeadingProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-5', className)}>
      <div>
        {kicker && (
          <div
            className={cn(
              'font-display text-[10px] sm:text-xs tracking-[0.25em] mb-1.5',
              onBand ? 'text-[hsl(var(--band-foreground))]/70' : 'text-muted-foreground'
            )}
          >
            {kicker}
          </div>
        )}
        <h2
          className={cn(
            'font-condensed leading-[0.92] text-3xl sm:text-4xl md:text-5xl',
            onBand ? 'band-fg' : 'text-foreground'
          )}
        >
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
