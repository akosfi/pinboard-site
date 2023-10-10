import Todo from 'modules/todos/domain/Todo';
import { FC } from 'react';

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data }) => {
    return (
        <>
            <div>
                <label htmlFor="text">Text:</label>
                <p>{data.todo.content}</p>
                <input id="text" name="text" className="nodrag" />
                <button>Delete</button>
            </div>
        </>
    );
};

export default TodoNode;
