import { Todo, TodoDTO } from 'modules/todos';
import UpdateTodoUseCase from '../../useCases/UpdateTodoUseCase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RemoteTodoFactory } from 'modules/todos/remote/RemoteTodo';

const updateTodoThunk = createAsyncThunk<
    { todo: TodoDTO },
    { todo: Todo },
    { rejectValue: string }
>('pinboardSlice/updateTodoThunk', async ({ todo }, thunkAPI) => {
    try {
        const { todo: updatedTodo } = await new UpdateTodoUseCase({
            todo,
        }).execute();

        return { todo: new RemoteTodoFactory().from(updatedTodo) };
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to update todo.');
    }
});

export default updateTodoThunk;
