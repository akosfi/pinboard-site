import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Todo } from 'modules/todos';
import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';

import css from './TodoNode.module.scss';

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data: { todo } }) => {
    const { deleteTodo, updateTodo, markTodoAsDone } = useTodoContext();
    const [draftContent, setDraftContent] = useState(todo.content);
    const [isEditingActive, setIsEditingActive] = useState(false);

    useEffect(() => {
        if (isEditingActive) {
            setDraftContent(todo.content);
        }
    }, [isEditingActive, todo, setDraftContent]);

    const handleConfirmationClick = () => {
        todo.content = draftContent;
        updateTodo(todo);
        setIsEditingActive(false);
    };

    const actionsFragment = useMemo(() => {
        const editButton = (
            <img
                src="/assets/edit_icon.svg"
                onClick={() => setIsEditingActive(!isEditingActive)}
            />
        );
        const deleteButton = (
            <img
                src="/assets/trash_icon.svg"
                onClick={() => deleteTodo(todo)}
            />
        );

        //TODO: check mark as done functionaly. Bug updateing todo.
        const markAsDoneButton = (
            <img
                src="/assets/check_icon.svg"
                onClick={() => markTodoAsDone(todo)}
            />
        );
        const withActionsWrapper = (element: ReactElement) => (
            <div className={css['actions']}>{element}</div>
        );

        if (todo.isDone()) {
            return withActionsWrapper(<>{deleteButton}</>);
        }

        return withActionsWrapper(
            <>
                {markAsDoneButton}
                {editButton}
                {deleteButton}
            </>,
        );
    }, [deleteTodo, isEditingActive, markTodoAsDone, todo]);

    return (
        <div className={css['node']}>
            {!isEditingActive ? (
                <p
                    className={classNames(css['content'], {
                        [css['content-todoDone']]: todo.isDone(),
                    })}
                >
                    {todo.content}
                </p>
            ) : (
                <div className={css['editingArea']}>
                    <textarea
                        onChange={(e) => setDraftContent(e.target.value)}
                        value={draftContent}
                    />
                    <button onClick={handleConfirmationClick}>Save</button>
                </div>
            )}
            {actionsFragment}
        </div>
    );
};

export default TodoNode;
