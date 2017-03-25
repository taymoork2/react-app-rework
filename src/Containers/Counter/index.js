import { connect } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  pause,
  incrementAsync,
} from '../../Actions/Counter';
import { Counter } from '../../Components';

const mapStateToProps = state => ({
  count: state.getIn(['Counter']),
});

const mapDispatchToProps = dispatch => ({
  startIncrementAsync: () => dispatch(incrementAsync()),
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
  onReset: () => dispatch(reset()),
  initiatePause: () => dispatch(pause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
