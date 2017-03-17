export const increment = () => ({ type: 'INCREMENT' });

export const decrement = () => ({ type: 'DECREMENT' });

export const reset = () => ({ type: 'RESET' });

export const pause = () => ({ type: 'PAUSE' });

export function incrementAsync() {
  return (dispatch) => {
    setInterval(() => {
      dispatch(increment());
    }, 1000);
  };
}
