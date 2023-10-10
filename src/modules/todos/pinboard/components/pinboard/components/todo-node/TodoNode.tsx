
import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';
import { FC } from 'react';
import { Todo } from 'modules/todos';

import css from "./TodoNode.module.scss";

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data }) => {
    const { deleteTodo } = useTodoContext();
    return (
        <div className={css["node"]}>
            <p>{data.todo.content}</p>
            <span onClick={() => deleteTodo(data.todo)} className={css["deleteIcon"]}>X</span>
        </div>
    );
};

export default TodoNode;
