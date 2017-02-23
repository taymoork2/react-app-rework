import React, { Component, PropTypes } from 'react';

class DisplayCount extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    startIncrementAsync: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.startIncrementAsync();
  }

  render() {
    const { count, onIncrement, onDecrement, onReset } = this.props;

    return (
      <h4>Counter: {count}</h4>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>Reset</button>
    )
  }
}
