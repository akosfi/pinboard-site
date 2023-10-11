import {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import todoContext from './todoContext';
import Todo from 'modules/todos/domain/Todo';
import RemoteTodoRepository from 'modules/todos/remote/RemoteTodoRepository';
import axiosInstance from 'remote/axiosInstance';
import GetAllTodosUseCase from '../useCases/GetAllTodosUseCase';
import DeleteTodoUseCase from '../useCases/DeleteTodoUseCase';
import UpdateTodoUseCase from '../useCases/UpdateTodoUseCase';
import CreateTodoUseCase from '../useCases/CreateTodoUseCase';
import MarkTodoAsDoneUseCase from '../useCases/MarkTodoAsDoneUseCase';

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

    const deleteTodo = useCallback(
        async (todoToDelete: Todo) => {
            try {
                await new DeleteTodoUseCase({
                    todo: todoToDelete,
                }).execute();
                setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
            } catch (error) {
                //TODO: handle this
            }
        },
        [todos, setTodos],
    );

    const updateTodo = useCallback(
        async (todoToUpdate: Todo) => {
            try {
                const { todo } = await new UpdateTodoUseCase({
                    todo: todoToUpdate,
                }).execute();

                const todoIndex = todos.findIndex(({ id }) => id === todo.id);

                setTodos([
                    ...todos.slice(0, todoIndex),
                    todo,
                    ...todos.slice(todoIndex + 1),
                ]);
            } catch (error) {
                //TODO: handle this
            }
        },
        [todos, setTodos],
    );

    const createTodo = useCallback(
        async (newTodoContent: string) => {
            try {
                const { todos } = await new CreateTodoUseCase({
                    todoRepository: new RemoteTodoRepository(axiosInstance),
                    newTodoContent,
                }).execute();
                setTodos(todos);
            } catch (error) {
                //TODO: handle this
            }
        },
        [setTodos],
    );

    const markTodoAsDone = useCallback(
        async (todo: Todo) => {
            try {
                const { todo: todoMarkedAsDone } =
                    await new MarkTodoAsDoneUseCase({
                        todo,
                    }).execute();

                const todoIndex = todos.findIndex(({ id }) => id === todo.id);

                setTodos([
                    ...todos.slice(0, todoIndex),
                    todoMarkedAsDone,
                    ...todos.slice(todoIndex + 1),
                ]);
            } catch (error) {
                //TODO: handle this
            }
        },
        [setTodos],
    );

    const nodes = useMemo(
        () =>
            todos.map((todo) => ({
                id: todo.id,
                type: 'todoNode',
                position: {
                    x: Number(todo.metaData.position.x),
                    y: Number(todo.metaData.position.y),
                },
                data: { todo },
            })),
        [todos],
    );

    return (
        <todoContext.Provider
            value={{
                todos,
                nodes,
                deleteTodo,
                updateTodo,
                createTodo,
                markTodoAsDone,
            }}
        >
            {children}
        </todoContext.Provider>
    );
};

export default TodoContextProvider;
