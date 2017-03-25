import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  static propTypes = {
    startIncrementAsync: PropTypes.func.isRequired,
    count: PropTypes.shape({
      count: PropTypes.number,
    }).isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    initiatePause: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.startIncrementAsync();
  }

  componentWillUnmount() {
    this.props.initiatePause();
  }

  render() {
    const { count, onIncrement, onDecrement, onReset } = this.props;

    return (
      <div className="Counter">
        <p style={{ fontSize: 'large' }}>To modify this component, edit:</p>
        <code style={{ fontSize: 'larger' }}>
          src/Components/Counter/index.js
        </code>
        <br />
        <code style={{ fontSize: 'larger' }}>
          src/Containers/Counter/index.js
        </code>
        <p>and save to see the changes</p>
        <h4>Counter: {count.count}</h4>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}

/* export default function DisplayCount(count, onIncrement, onDecrement, onReset) {
  return (
    <div>
      <h4>Counter: {count}</h4>
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
};*/
