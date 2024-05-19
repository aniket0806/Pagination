import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTodos } from './Store/Store';
import Cards from './components/Cards';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { todos, todosPerPage, currentPage, loading } = useSelector((state) => state.todosStore);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    dispatch(fetchAllTodos());
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  }, [dispatch]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  if (loadingState || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="card-container">
        {currentTodos.map((todo) => (
          <Cards key={todo.id} todo={todo} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}

export default App;


