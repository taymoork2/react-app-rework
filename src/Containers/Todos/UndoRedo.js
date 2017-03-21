import React, { PropTypes } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

UndoRedo.propTypes = {
  canUndo: PropTypes.func.isRequired,
  canRedo: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  canUndo: state.getIn(['Todos']).past.length > 0,
  canRedo: state.getIn(['Todos']).future.length > 0,
});

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
});

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

