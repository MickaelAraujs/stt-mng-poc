import { memo, useRef } from 'react';

import { useRenderCounter } from '../hooks/useRenderCounter';
import { useGlobalStore } from '../store/global-store';

function TodoFormComponent() {
  useRenderCounter('TodoForm');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodo = useGlobalStore((state) => state.addTodo);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputRef.current?.value) {
      addTodo(inputRef.current.value);
      inputRef.current.value = '';
    }
  }

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <input
        className="h-12 w-4/5 rounded-lg bg-white/5 px-4 outline-none
          transition-all focus:ring-1 focus:ring-white"
        placeholder="Task Title..."
        ref={inputRef}
      />

      <button
        type="submit"
        className="rounded-lg w-1/5 bg-white px-6 font-semibold text-zinc-950
          transition-opacity hover:opacity-90"
      >
        Add Task
      </button>
    </form>
  );
}

export const TodoForm = memo(TodoFormComponent);
