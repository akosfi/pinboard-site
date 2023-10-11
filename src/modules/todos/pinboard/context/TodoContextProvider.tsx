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
    const [errors, setErrors] = useState<string[]>([]);
    const [userActionIsInProgress, setUserActionIsInProgress] = useState(false);

    const refreshTodoInList = useCallback(
        (todo: Todo) => {
            const todoToRefreshIndex = todos.findIndex(
                ({ id }) => id === todo.id,
            );

            setTodos([
                ...todos.slice(0, todoToRefreshIndex),
                todo,
                ...todos.slice(todoToRefreshIndex + 1),
            ]);
        },
        [todos, setTodos],
    );

    const addError = useCallback(
        (error: string) => {
            setErrors([...errors, error]);
        },
        [setErrors, errors],
    );

    const loadAllTodos = useCallback(async () => {
        try {
            const { todos } = await new GetAllTodosUseCase({
                todoRepository: new RemoteTodoRepository(axiosInstance),
            }).execute();
            setTodos(todos);
        } catch (error) {
            addError('Failed to load todos.');
        }
    }, [setTodos, addError]);

    useEffect(() => {
        loadAllTodos();
    }, [loadAllTodos])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (!userActionIsInProgress) {
            interval = setInterval(loadAllTodos, 5000);
        }

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        }
    }, [userActionIsInProgress]);

    const deleteTodo = useCallback(
        async (todoToDelete: Todo) => {
            try {
                setUserActionIsInProgress(true);
                await new DeleteTodoUseCase({
                    todo: todoToDelete,
                }).execute();
                setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
            } catch (error) {
                addError('Failed to delete todo.');
            } finally {
                setUserActionIsInProgress(false)
            }
        },
        [todos, setTodos, addError],
    );

    const updateTodo = useCallback(
        async (todoToUpdate: Todo) => {
            try {
                setUserActionIsInProgress(true)
                const { todo } = await new UpdateTodoUseCase({
                    todo: todoToUpdate,
                }).execute();
                refreshTodoInList(todo);
            } catch (error) {
                addError('Failed to update todo.');
            } finally {
                setUserActionIsInProgress(false)
            }
        },
        [refreshTodoInList, addError],
    );

    const createTodo = useCallback(
        async (newTodoContent: string) => {
            try {
                setUserActionIsInProgress(true)
                const { todos } = await new CreateTodoUseCase({
                    todoRepository: new RemoteTodoRepository(axiosInstance),
                    newTodoContent,
                }).execute();
                setTodos(todos);
            } catch (error) {
                addError('Failed to create todo.');
            } finally {
                setUserActionIsInProgress(false)
            }
        },
        [setTodos, addError],
    );

    const markTodoAsDone = useCallback(
        async (todo: Todo) => {
            try {
                setUserActionIsInProgress(true)
                const { todo: todoMarkedAsDone } =
                    await new MarkTodoAsDoneUseCase({
                        todo,
                    }).execute();

                refreshTodoInList(todoMarkedAsDone);
            } catch (error) {
                addError('Failed to mark todo as done.');
            } finally {
                setUserActionIsInProgress(false)
            }
        },
        [refreshTodoInList, addError],
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
                errors,
            }}
        >
            {children}
        </todoContext.Provider>
    );
};

export default TodoContextProvider;
