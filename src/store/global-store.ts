import { ITodo } from "../entities/ITodo";
import { IUser } from "../entities/IUser";
import { createStore } from "./create-store";

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login: () => void;
  logout: () => void;
}

export const globalStore = createStore<IGlobalStore>((getState, setState) => ({
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
  }
}));
