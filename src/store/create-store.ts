import { useEffect, useState } from "react";

type SetterFn<TState> = (prevState: TState) => Partial<TState>;
type SetStateFn<TState> = (partialState: Partial<TState> | SetterFn<TState>) => void;
type GetStateFn<TState> = () => TState;

export function createStore<TState extends Record<string, any>>(
  createInitialStateFn: (
    getStateFn: GetStateFn<TState>,
    setStateFn: SetStateFn<TState>
  ) => TState
) {
  let state: TState;
  let listeners: Set<() => void>;

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    }
  }

  const notify = () => {
    listeners.forEach(listener => listener());
  }

  const getState = () => state

  const setState = (partialState: Partial<TState> | SetterFn<TState>) => {
    const newValue = typeof partialState === 'function'
      ? partialState(state)
      : partialState;

    state = {
      ...state,
      ...newValue,
    };

    notify();
  }

  const useStore = <TValue>(selectorFn: (currentState: TState) => TValue): TValue => {
    const [value, setValue] = useState(() => selectorFn(state));

    useEffect(() => {
      const unsubscribe = subscribe(() => {
        const newValue = selectorFn(state);
        if (newValue !== value) {
          setValue(newValue);
        }
      });

      return () => {
        unsubscribe();
      }
    }, [selectorFn, value]);

    return value;
  }

  state = createInitialStateFn(getState, setState);
  listeners = new Set<() => void>();

  return {
    getState,
    setState,
    subscribe,
    useStore,
  }
}
