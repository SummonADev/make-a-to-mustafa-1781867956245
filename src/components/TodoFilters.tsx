import { TodoFilter } from '@/types';
import { cn } from '@/lib/utils';

type TodoFiltersProps = {
  activeFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  totalCount: number;
  activeCount: number;
};

export default function TodoFilters({ activeFilter, onFilterChange, totalCount, activeCount }: TodoFiltersProps) {
  const filters: { label: string; value: TodoFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-1">
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeFilter === filter.value
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {activeCount} items left of {totalCount}
      </div>
    </div>
  );
}