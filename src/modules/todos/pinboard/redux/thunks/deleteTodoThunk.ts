import { Todo } from 'modules/todos';
import DeleteTodoUseCase from '../../useCases/DeleteTodoUseCase';
import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteTodoThunk = createAsyncThunk<
    void,
    { todo: Todo },
    { rejectValue: string }
>('pinboardSlice/deleteTodoThunk', async ({ todo }, thunkAPI) => {
    try {
        await new DeleteTodoUseCase({
            todo,
        }).execute();
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to delete todo.');
    }
});

export default deleteTodoThunk;
