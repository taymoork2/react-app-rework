import React from 'react';
import { Footer } from '../../Components';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import UndoRedo from './UndoRedo';

const Todos = () => (
  <div style={{ marginTop: '1em' }}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <UndoRedo />
  </div>
);

export default Todos;
