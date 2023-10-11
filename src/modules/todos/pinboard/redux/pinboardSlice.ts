import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TodoDTO } from 'modules/todos';
import getAllTodosThunk from './thunks/getAllTodosThunk';
import createTodoThunk from './thunks/createTodoThunk';
import deleteTodoThunk from './thunks/deleteTodoThunk';
import markTodoAsDoneThunk from './thunks/markTodoAsDoneThunk';
import updateTodoThunk from './thunks/updateTodoThunk';

export interface PinboardSlice {
    todos: TodoDTO[];
    errors: string[];
    isUserActionInProgress: boolean;
}

const initialState: PinboardSlice = {
    todos: [],
    errors: [],
    isUserActionInProgress: false,
};

export const pinboardSlice = createSlice({
    name: 'pinboardSlice',
    initialState,
    reducers: {
        addError: (
            state,
            { payload: { error } }: PayloadAction<{ error: string }>,
        ) => {
            state.errors = [...state.errors, error];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getAllTodosThunk.fulfilled,
            (state, { payload: { todos } }) => {
                state.todos = todos;
            },
        );
        builder.addCase(getAllTodosThunk.rejected, (state, { payload }) => {
            if (typeof payload !== 'undefined') {
                state.errors = [...state.errors, payload];
            }
        });
        builder.addCase(createTodoThunk.pending, (state) => {
            state.isUserActionInProgress = true;
        });
        builder.addCase(createTodoThunk.rejected, (state, { payload }) => {
            if (typeof payload !== 'undefined') {
                state.errors = [...state.errors, payload];
            }
            state.isUserActionInProgress = false;
        });
        builder.addCase(
            createTodoThunk.fulfilled,
            (state, { payload: { todos } }) => {
                state.todos = todos;
                state.isUserActionInProgress = false;
            },
        );
        builder.addCase(deleteTodoThunk.pending, (state) => {
            state.isUserActionInProgress = true;
        });
        builder.addCase(deleteTodoThunk.rejected, (state, { payload }) => {
            if (typeof payload !== 'undefined') {
                state.errors = [...state.errors, payload];
            }
            state.isUserActionInProgress = false;
        });
        builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.meta.arg.todo.id,
            );
            state.isUserActionInProgress = false;
        });
        builder.addCase(markTodoAsDoneThunk.pending, (state) => {
            state.isUserActionInProgress = true;
        });
        builder.addCase(markTodoAsDoneThunk.rejected, (state, { payload }) => {
            if (typeof payload !== 'undefined') {
                state.errors = [...state.errors, payload];
            }
            state.isUserActionInProgress = false;
        });
        builder.addCase(
            markTodoAsDoneThunk.fulfilled,
            (state, { payload: { todo } }) => {
                const todoToRefreshIndex = state.todos.findIndex(
                    ({ id }) => id === todo.id,
                );

                state.todos = [
                    ...state.todos.slice(0, todoToRefreshIndex),
                    todo,
                    ...state.todos.slice(todoToRefreshIndex + 1),
                ];
                state.isUserActionInProgress = false;
            },
        );
        builder.addCase(updateTodoThunk.pending, (state) => {
            state.isUserActionInProgress = true;
        });
        builder.addCase(updateTodoThunk.rejected, (state, { payload }) => {
            if (typeof payload !== 'undefined') {
                state.errors = [...state.errors, payload];
            }
            state.isUserActionInProgress = false;
        });
        builder.addCase(
            updateTodoThunk.fulfilled,
            (state, { payload: { todo } }) => {
                const todoToRefreshIndex = state.todos.findIndex(
                    ({ id }) => id === todo.id,
                );

                state.todos = [
                    ...state.todos.slice(0, todoToRefreshIndex),
                    todo,
                    ...state.todos.slice(todoToRefreshIndex + 1),
                ];
                state.isUserActionInProgress = false;
            },
        );
    },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default pinboardSlice.reducer;
