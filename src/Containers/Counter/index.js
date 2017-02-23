import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset, incrementAsync } from '../../Actions/counter';
import Counter as DisplayCount from '../../Components';

const Counter = () => (
  <div className="Counter">
    <p style={{ fontSize: 'large' }}>To modify this component, edit <code>src/Components/Counter/index.js</code> and save to see the changes</p>
    <DisplayCount />
  </div>
);

const mapStateToProps = state => ({
  count: state.Counter,
});

const mapDispatchToProps = dispatch => ({
  startIncrementAsync: () => dispatch(incrementAsync()),
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
  onReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
