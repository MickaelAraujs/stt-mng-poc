import { CircleOffIcon, LayoutListIcon } from 'lucide-react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStore } from '../store/global-store';

export function TodosCounter() {
  useRenderCounter('TodosCounter')

  const todos = useGlobalStore(state => state.todos);
  const totalTodos = todos.length;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs">
      {totalTodos === 0 && (
        <>
          <CircleOffIcon className="h-4 w-4" />
          <span>No task Created!</span>
        </>
      )}

      {totalTodos > 0 && (
        <>
          <LayoutListIcon className="h-4 w-4" />
          <span>Task count: {totalTodos}</span>
        </>
      )}
    </div>
  );
}
