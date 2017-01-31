import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '../../Actions/counter';

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  incrementAsync = () => setTimeout(this.props.onIncrement, 1000);

  render() {
    const { count, onIncrement, onDecrement, onReset } = this.props;

    return (
      <div className="Counter">
        <p style={{ fontSize: 'large' }}>To modify this component, edit <code>src/Components/Counter/index.js</code> and save to see the changes</p>
        <h4>Counter: {count}</h4>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
