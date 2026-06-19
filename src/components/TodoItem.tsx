import { Check, Trash2, Square } from 'lucide-react';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-slate-200 mb-3">
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors",
          todo.completed 
            ? "bg-primary border-primary text-white" 
            : "border-slate-300 text-transparent hover:border-primary"
        )}
      >
        {todo.completed ? <Check size={14} strokeWidth={3} /> : <Square size={14} className="opacity-0 group-hover:opacity-20 text-slate-400" />}
      </button>
      
      <span className={cn(
        "flex-1 text-slate-700 transition-all",
        todo.completed && "text-slate-400 line-through"
      )}>
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}