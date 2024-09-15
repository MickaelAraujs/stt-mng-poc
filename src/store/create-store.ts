type SetterFn<TState> = (prevState: TState) => Partial<TState>;

export function createStore<TState>(initialState: TState) {
  let state = initialState;

  const getState = () => state

  const setState = (partialState: Partial<TState> | SetterFn<TState>) => {
    const newValue = typeof partialState === 'function'
      ? partialState(state)
      : partialState;

    state = {
      ...state,
      ...newValue,
    };
  }

  return {
    getState,
    setState,
  }
}
