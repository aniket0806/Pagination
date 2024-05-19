import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodosAction } from '../Store/Store';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, todos, todosPerPage } = useSelector(state => state.todosStore);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  const handlePageClick = (page) => {
    dispatch(TodosAction.setCurrentPage(page));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(TodosAction.onNavigateNext());
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(TodosAction.onNavigatePrev());
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
      {pages.map(page => (
        <button 
          key={page} 
          onClick={() => handlePageClick(page)} 
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
