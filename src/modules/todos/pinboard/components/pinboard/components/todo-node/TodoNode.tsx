import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';
import { FC, useEffect, useState } from 'react';
import { Todo } from 'modules/todos';

import css from './TodoNode.module.scss';

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data }) => {
    const { deleteTodo, updateTodo } = useTodoContext();
    const [draftContent, setDraftContent] = useState(data.todo.content);
    const [isEditingActive, setIsEditingActive] = useState(false);

    useEffect(() => {
        if (isEditingActive) {
            setDraftContent(data.todo.content);
        }
    }, [isEditingActive, data, setDraftContent]);

    const handleConfirmationClick = () => {
        const todo = data.todo;
        todo.content = draftContent;
        updateTodo(todo);
        setIsEditingActive(false);
    };

    return (
        <div className={css['node']}>
            {!isEditingActive ? (
                <p>{data.todo.content}</p>
            ) : (
                <div className={css['editingArea']}>
                    <textarea
                        onChange={(e) => setDraftContent(e.target.value)}
                        value={draftContent}
                    />
                    <button onClick={handleConfirmationClick}>Confirm</button>
                </div>
            )}
            <div className={css['actions']}>
                <span onClick={() => setIsEditingActive(!isEditingActive)}>
                    E
                </span>
                <span onClick={() => deleteTodo(data.todo)}>X</span>
            </div>
        </div>
    );
};

export default TodoNode;
