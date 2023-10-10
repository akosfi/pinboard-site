import Todo from 'modules/todos/domain/Todo';
import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';
import { FC } from 'react';

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data }) => {
    const { deleteTodo } = useTodoContext();
    return (
        <>
            <div>
                <label htmlFor="text">Text:</label>
                <p>{data.todo.content}</p>
                <input id="text" name="text" className="nodrag" />
                <button onClick={() => deleteTodo(data.todo)}>Delete</button>
            </div>
        </>
    );
};

export default TodoNode;
