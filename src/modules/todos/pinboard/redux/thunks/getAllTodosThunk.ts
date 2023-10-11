import { createAsyncThunk } from '@reduxjs/toolkit';
import { RemoteTodoRepository, TodoDTO } from 'modules/todos';
import axiosInstance from 'remote/axiosInstance';
import GetAllTodosUseCase from '../../useCases/GetAllTodosUseCase';

const getAllTodosThunk = createAsyncThunk<
    { todos: TodoDTO[] },
    void,
    { rejectValue: string }
>('pinboardSlice/getAllTodosThunk', async (_, thunkAPI) => {
    try {
        const { todos } = await new GetAllTodosUseCase({
            todoRepository: new RemoteTodoRepository(axiosInstance),
        }).execute();

        return { todos: todos.map(({ serialize }) => serialize()) };
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to load todos.');
    }
});

export default getAllTodosThunk;
