export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});

export const reset = () => ({
  type: 'RESET',
});

export const incrementAsync = (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};
