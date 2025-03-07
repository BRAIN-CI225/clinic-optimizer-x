
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, PlusCircle } from 'lucide-react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

interface TodoListProps {
  initialTodos?: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTodoText('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Tâches à faire</h2>
      
      <ul className="space-y-2">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 py-2"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0 mt-0.5 focus:outline-none"
              >
                {todo.completed ? (
                  <CheckCircle className="h-5 w-5 text-dental-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </button>
              <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
        
        <AnimatePresence>
          {isAdding ? (
            <motion.li
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 py-2"
            >
              <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (newTodoText.trim() !== '') {
                    addTodo();
                  } else {
                    setIsAdding(false);
                  }
                }}
                placeholder="Nouvelle tâche..."
                className="flex-1 border-b border-gray-200 focus:border-dental-500 outline-none py-1 text-gray-700"
              />
            </motion.li>
          ) : (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-2"
            >
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center text-dental-500 hover:text-dental-600 transition-colors focus:outline-none"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                <span>Ajouter une tâche</span>
              </button>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TodoList;
