type SetterFn<TState> = (prevState: TState) => Partial<TState>;

export function createStore<TState>(initialState: TState) {
  let state = initialState;
  const listeners = new Set<() => void>();

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

  return {
    getState,
    setState,
    subscribe,
  }
}
