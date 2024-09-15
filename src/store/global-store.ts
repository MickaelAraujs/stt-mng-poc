import { ITodo } from "../entities/ITodo";
import { IUser } from "../entities/IUser";
import { createStore } from "./create-store";

interface IUseGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login: () => void;
  logout: () => void;
  addTodo(title: string, author?: string): void;
  toggleTodoDone(todoId: number): void;
  removeTodo(todoId: number): void;
}

export const useGlobalStore = createStore<IUseGlobalStore>((getState, setState) => ({
  user: null,
  todos: [],
  login: () => {
    setState(() => ({
      user: {
        email: 'jhondoe@test.com',
        name: 'Jhon Doe',
      }
    }))
  },
  logout: () => {
    setState(() => ({
      user: null,
    }))
  },
  addTodo: (title: string) => {
    setState((prevState) => ({
      todos: prevState.todos.concat({
        id: Date.now(),
        title,
        author: getState().user?.name ?? 'Guest',
        done: false,
      })
    }));
  },
  toggleTodoDone: (todoId: number) => {
    setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo,
    )
    }))
  },
  removeTodo: (todoId: number) => {
    setState((prevState) => ({ todos: prevState.todos.filter(todo => todo.id !== todoId) }));
  },
}));
