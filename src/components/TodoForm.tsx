import React, { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoFormProps = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white shadow-sm"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl transition-colors shadow-md shadow-blue-200 flex items-center justify-center"
        aria-label="Add todo"
      >
        <Plus size={24} />
      </button>
    </form>
  );
}