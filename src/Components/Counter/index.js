import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '../../Actions/counter';

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    // incrementAsync: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  componentDidMount() {
    setTimeout(this.props.onIncrement, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { count, onIncrement, onDecrement, onReset } = this.props;

    return (
      <div className="Counter" onLoad={this.incerementAsync}>
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
  count: state.Counter,
});

const mapDispatchToProps = dispatch => ({
  // incrementAsync: () => dispatch(incrementAsync()),
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
  onReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
