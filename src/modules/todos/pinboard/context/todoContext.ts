import Todo from 'modules/todos/domain/Todo';
import { createContext } from 'react';

type TodoNode = {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { todo: Todo };
};

type TodoContextState = {
    todos: Todo[];
    nodes: TodoNode[];
    deleteTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    createTodo: (newTodoContent: string) => void;
    markTodoAsDone: (todo: Todo) => void;
};

const todoContext = createContext<TodoContextState>({
    todos: [],
    nodes: [],
    deleteTodo: () => null,
    updateTodo: () => null,
    createTodo: () => null,
    markTodoAsDone: (todo: Todo) => null,
});

export default todoContext;
