let interval;

export const increment = () => ({ type: 'INCREMENT' });

export const asyncIncrement = () => ({ type: 'INCREMENT_ASYNC' });

export const decrement = () => ({ type: 'DECREMENT' });

export const reset = () => ({ type: 'RESET' });

export const pause = () => {
  clearInterval(interval);
  return ({ type: 'PAUSE' });
};

export const incrementAsync = () => (dispatch) => {
  interval = setInterval(() => dispatch(asyncIncrement()), 1000);
};

