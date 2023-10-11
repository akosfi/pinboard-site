import { createSelector } from '@reduxjs/toolkit';
import { RemoteTodoFactory } from 'modules/todos';
import { RootState } from 'redux/store';

const getState = (state: RootState) => state.pinboard;

const getTodoDTOs = (state: RootState) => getState(state).todos;

const getTodos = createSelector(getTodoDTOs, (todoDTOs) =>
    todoDTOs.map(new RemoteTodoFactory().from),
);

const getNodes = createSelector(getTodos, (todoDTOs) =>
    todoDTOs.map((todo) => ({
        id: todo.id,
        type: 'todoNode',
        position: {
            x: Number(todo.metaData.position.x),
            y: Number(todo.metaData.position.y),
        },
        data: { todo },
    })),
);

const getIsUserActionInProgress = (state: RootState) =>
    getState(state).isUserActionInProgress;

const getErrors = (state: RootState) => getState(state).errors;

const pinboardSelectors = {
    getTodos,
    getIsUserActionInProgress,
    getErrors,
    getNodes,
};

export default pinboardSelectors;
