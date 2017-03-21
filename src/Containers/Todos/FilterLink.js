import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../Actions/Todos';
import { Link } from '../../Components';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.getIn(['VisibilityFilter']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
