import { connect } from 'react-redux';
import { toggleTodo } from '../../Actions/Todos';
import { TodoList } from '../../Components';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.getIn(['Todos']).present, state.getIn(['VisibilityFilter'])),
});

const mapDispatchToProps = ({
  onTodoClick: toggleTodo,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

