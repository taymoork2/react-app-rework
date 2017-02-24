import React, { PropTypes } from 'react';

export default function DisplayCount(count, onIncrement, onDecrement, onReset) {
  return (
    <div>
      <h4>Counter: {count.count}</h4>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

DisplayCount.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
