import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset, incrementAsync } from '../../Actions/counter';
// import { DisplayCount } from '../../Components';

class Counter extends Component {
  static propTypes = {
    startIncrementAsync: PropTypes.func.isRequired,
    count: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
      <div className="Counter">
        <p style={{ fontSize: 'large' }}>To modify this component, edit <code>src/Components/Counter/index.js</code> and save to see the changes</p>
        <h4>Counter: {count.count}</h4>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.getIn(['Counter']),
});

const mapDispatchToProps = dispatch => ({
  startIncrementAsync: () => dispatch(incrementAsync()),
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
  onReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
