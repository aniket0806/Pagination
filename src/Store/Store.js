import { configureStore, createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        todosPerPage: 8,
        currentPage: 1,
        loading: true,
    },
    reducers: {
        fetchTodos: (state, action) => {
            state.todos = action.payload;
            state.loading = false;
        },
        removeTodo: (state, action) => {
            const newTodos = state.todos.filter(todo => todo.id !== action.payload);
            if ((state.currentPage - 1) * state.todosPerPage >= newTodos.length) {
                state.currentPage = Math.max(1, state.currentPage - 1);
            }
            state.todos = newTodos;
        },
        onNavigateNext: (state) => {
            if (state.currentPage < Math.ceil(state.todos.length / state.todosPerPage)) {
                state.currentPage++;
            }
        },
        onNavigatePrev: (state) => {
            if (state.currentPage > 1) {
                state.currentPage--;
            }
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        onChangeTodosPerPage: (state, action) => {
            state.todosPerPage = action.payload;
        }
    }
});

const fetchAllTodos = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const todos = await response.json();
            dispatch(TodosAction.fetchTodos(todos.map(todo => ({
                id: todo.id, 
                title: todo.title,
                body: todo.body, 
                date: new Date().toISOString()
            }))));
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
};

const store = configureStore({
    reducer: {
        todosStore: todosSlice.reducer,
    }
});

export { fetchAllTodos };
export const TodosAction = todosSlice.actions;
export default store;
