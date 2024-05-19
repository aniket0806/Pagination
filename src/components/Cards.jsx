import React from 'react';
import { useDispatch } from 'react-redux';
import { TodosAction } from '../Store/Store';



const Cards = ({ todo }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(TodosAction.removeTodo(todo.id));
  };

  return (
    <div className="card">
      <div>
      <button onClick={handleRemove} className="remove-btn">X</button>
      </div>
      <div>

      <h1><b>{todo.title}</b></h1>
      <h5>{todo.body}</h5>
      </div>
      <p>Mon,21 Dec 2020 14:57GMT</p>
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample" />
    </div>
  );
};

export default Cards;
