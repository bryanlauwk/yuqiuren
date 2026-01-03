import { cn } from '@/lib/utils';

type FilterOption = 'all' | 'today' | 'live';

interface MatchFiltersProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  liveCount: number;
}

export function MatchFilters({ activeFilter, onFilterChange, liveCount }: MatchFiltersProps) {
  const filters: { value: FilterOption; label: string; showBadge?: boolean }[] = [
    { value: 'live', label: 'Live', showBadge: true },
    { value: 'today', label: 'Today' },
    { value: 'all', label: 'All Matches' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
            'flex items-center gap-2',
            activeFilter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {filter.label}
          {filter.showBadge && liveCount > 0 && (
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-xs font-bold',
              activeFilter === filter.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-live text-primary-foreground'
            )}>
              {liveCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
