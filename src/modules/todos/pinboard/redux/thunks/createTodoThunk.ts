import { createAsyncThunk } from '@reduxjs/toolkit';
import { RemoteTodoRepository, TodoDTO } from 'modules/todos';
import axiosInstance from 'remote/axiosInstance';
import CreateTodoUseCase from '../../useCases/CreateTodoUseCase';

const createTodoThunk = createAsyncThunk<
    { todos: TodoDTO[] },
    { newTodoContent: string },
    { rejectValue: string }
>('pinboardSlice/createTodoThunk', async ({ newTodoContent }, thunkAPI) => {
    try {
        const { todos } = await new CreateTodoUseCase({
            todoRepository: new RemoteTodoRepository(axiosInstance),
            newTodoContent,
        }).execute();

        return { todos: todos.map(({ serialize }) => serialize()) };
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to create todo.');
    }
});

export default createTodoThunk;
