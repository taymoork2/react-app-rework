export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});

export const reset = () => ({
  type: 'RESET',
});

/* export const incrementAsync = dispatch => { // eslint-disable-line arrow-parens
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

export const decrementAsync = dispatch => { // eslint-disable-line arrow-parens
  setTimeout(() => {
    dispatch(decrement());
  }, 1000);
}; */
