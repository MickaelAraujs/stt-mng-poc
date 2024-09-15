import { ITodo } from "../entities/ITodo";
import { IUser } from "../entities/IUser";
import { createStore } from "./create-store";

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
}

export const globalStore = createStore<IGlobalStore>({
  user: null,
  todos: [],
});
