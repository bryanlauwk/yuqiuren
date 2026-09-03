import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  /** Render on a dark brand band */
  onBand?: boolean;
  /** ESPN-style solid header bar */
  variant?: 'default' | 'bar';
  /** Heading element to render */
  as?: 'h1' | 'h2';
}

/**
 * Pro-league section header: small uppercase kicker + oversized condensed title.
 * `variant="bar"` renders a solid broadcast-style header strip.
 */
export function SectionHeading({ kicker, title, action, className, onBand, variant = 'default', as = 'h2' }: SectionHeadingProps) {
  const Heading = as;
  if (variant === 'bar') {
    return (
      <div
        className={cn(
          'flex items-center justify-between gap-4 border-2 border-foreground bg-foreground px-4 py-3 sm:px-5 sm:py-3.5',
          className
        )}
      >
        <div className="min-w-0">
          {kicker && (
            <div className="mb-1 font-sans text-[9px] font-black uppercase tracking-[0.24em] text-background/60 sm:text-[10px]">
              {kicker}
            </div>
          )}
          <Heading className="truncate font-condensed text-2xl uppercase leading-none text-background sm:text-3xl md:text-4xl">
            {title}
          </Heading>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }

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
