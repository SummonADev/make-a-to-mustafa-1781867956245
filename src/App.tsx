import { useState, useMemo } from 'react';
import { CheckCircle2, ListTodo, LogOut } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Todo, TodoFilter, User } from '@/types';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import Auth from '@/components/Auth';

export default function App() {
  const [user, setUser] = useLocalStorage<User | null>('todo-user-v1', null);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos-v1', []);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleLogout = () => {
    setUser(null);
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  }, [todos, filter]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <header className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white shadow-lg shadow-blue-200 mb-4">
            <ListTodo size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-slate-500 mt-2">Stay organized and focused</p>
          
          {user && (
            <div className="mt-6 flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-slate-100" />
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.provider} account</p>
              </div>
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </header>

        <main>
          {!user ? (
            <div className="animate-in fade-in zoom-in duration-300">
              <Auth onLogin={setUser} />
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TodoForm onAdd={addTodo} />
              
              <TodoFilters 
                activeFilter={filter} 
                onFilterChange={setFilter}
                totalCount={todos.length}
                activeCount={activeCount}
              />

              <div className="min-h-[200px]">
                {filteredTodos.length > 0 ? (
                  <div className="grid gap-3">
                    {filteredTodos.map(todo => (
                      <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onToggle={toggleTodo} 
                        onDelete={deleteTodo} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                    <CheckCircle2 size={40} strokeWidth={1} className="mb-3 opacity-20" />
                    <p className="text-sm">No tasks found</p>
                  </div>
                )}
              </div>

              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="mt-6 w-full py-3 text-sm font-medium text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-100 rounded-xl"
                >
                  Clear {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
                </button>
              )}
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} Modern To-Do. Built with React 19.
        </footer>
      </div>
    </div>
  );
}