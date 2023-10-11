import { Todo, TodoDTO } from 'modules/todos';
import MarkTodoAsDoneUseCase from '../../useCases/MarkTodoAsDoneUseCase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RemoteTodoFactory } from 'modules/todos/remote/RemoteTodo';

const markTodoAsDoneThunk = createAsyncThunk<
    { todo: TodoDTO },
    { todo: Todo },
    { rejectValue: string }
>('pinboardSlice/markTodoAsDoneThunk', async ({ todo }, thunkAPI) => {
    try {
        const { todo: doneTodo } = await new MarkTodoAsDoneUseCase({
            todo,
        }).execute();

        return { todo: doneTodo.serialize() };
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to mark todo as done.');
    }
});

export default markTodoAsDoneThunk;
