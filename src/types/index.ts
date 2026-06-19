export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github';
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type TodoFilter = 'all' | 'active' | 'completed';