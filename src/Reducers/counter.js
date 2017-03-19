const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  const { count } = state;

  switch (action.type) {
    case 'INCREMENT':
      return {
        count: count + 1,
      };
    case 'INCREMENT_ASYNC':
      return {
        count: count + 1,
      };
    case 'DECREMENT':
      return {
        count: count - 1,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'PAUSE':
      return state;
    default:
      return state;
  }
};
