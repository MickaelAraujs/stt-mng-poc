import { AppBar } from './components/AppBar';
import { TodosList } from './components/TodosList';
import { useRenderCounter } from './hooks/useRenderCounter';

import './store/create-store';

export function App() {
  useRenderCounter('App');

  return (
    <>
      <AppBar />
      <TodosList />
    </>
  );
}
