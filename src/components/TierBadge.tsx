import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTier } from '@/lib/tier';

interface TierBadgeProps {
  points: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function TierBadge({ points, size = 'sm', className }: TierBadgeProps) {
  const { language } = useLanguage();
  const tier = getTier(points);
  const label = language === 'zh' ? tier.labelZh : tier.labelEn;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-display tracking-[0.14em] whitespace-nowrap rounded border-2 border-foreground/80',
        size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1',
        className,
      )}
      style={{
        background: `hsl(var(${tier.token}) / 0.18)`,
        color: `hsl(var(${tier.token}))`,
        borderColor: `hsl(var(${tier.token}) / 0.65)`,
        boxShadow: `0 0 10px hsl(var(${tier.token}) / 0.35)`,
      }}
      title={label}
    >
      {label}
    </span>
  );
}
