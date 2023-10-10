import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import todoContext from './todoContext';
import Todo from 'modules/todos/domain/Todo';
import RemoteTodoRepository from 'modules/todos/remote/RemoteTodoRepository';
import axiosInstance from 'remote/axiosInstance';
import GetAllTodosUseCase from '../useCases/GetAllTodosUseCase';
import DeleteTodoUseCase from '../useCases/DeleteTodoUseCase';

type TodoContextProviderProps = {
    children: ReactElement | ReactElement[];
};

const TodoContextProvider: FC<TodoContextProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const { todos } = await new GetAllTodosUseCase({
                    todoRepository: new RemoteTodoRepository(axiosInstance),
                }).execute();
                setTodos(todos);
            } catch (error) {
                //TODO: handle this
            }
        })();
    }, [setTodos]);

    const deleteTodo = useCallback(async (todoToDelete: Todo) => {
        try {
            await new DeleteTodoUseCase({
                todo: todoToDelete
            }).execute();
            setTodos(todos.filter(todo => todo.id !== todoToDelete.id));
        } catch (error) {
            //TODO: handle this
        }
    }, [todos, setTodos]);



    const nodes = useMemo(
        () =>
            todos.map((todo) => ({
                id: todo.id,
                type: 'todoNode',
                position: { x: 0, y: 0 },
                data: { todo },
            })),
        [todos],
    );

    return (
        <todoContext.Provider value={{ todos, nodes, deleteTodo }}>
            {children}
        </todoContext.Provider>
    );
};

export default TodoContextProvider;
