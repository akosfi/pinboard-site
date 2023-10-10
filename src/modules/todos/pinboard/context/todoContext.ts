import Todo from 'modules/todos/domain/Todo';
import { createContext } from 'react';

type TodoNode = {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { todo: Todo };
};

const todoContext = createContext<{ todos: Todo[]; nodes: TodoNode[] }>({
    todos: [],
    nodes: [],
});

export default todoContext;
