import { FC, KeyboardEventHandler, ReactElement, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Todo } from 'modules/todos';

import css from './TodoNode.module.scss';
import { RemoteTodoFactory } from 'modules/todos/remote/RemoteTodo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import deleteTodoThunk from 'modules/todos/pinboard/redux/thunks/deleteTodoThunk';
import updateTodoThunk from 'modules/todos/pinboard/redux/thunks/updateTodoThunk';
import markTodoAsDoneThunk from 'modules/todos/pinboard/redux/thunks/markTodoAsDoneThunk';

type TodoNodeProps = {
    data: {
        todo: Todo;
    };
};

const TodoNode: FC<TodoNodeProps> = ({ data: { todo } }) => {
    const [draftContent, setDraftContent] = useState(todo.content);
    const [isEditingActive, setIsEditingActive] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isEditingActive) {
            setDraftContent(todo.content);
        }
    }, [isEditingActive, todo.content, setDraftContent]);

    useEffect(() => {
        if (todo.isDone() && isEditingActive) {
            setIsEditingActive(false);
        }
    }, [todo, isEditingActive, setIsEditingActive]);


    const handleKeyDownOnInput = (...args: Parameters<KeyboardEventHandler<HTMLTextAreaElement>>) => {
        if (args[0].key === "Enter") {
            submitEditing();
        }
    }

    const submitEditing = () => {
        const todoToUpdate = new RemoteTodoFactory().from({
            ...todo.serialize(),
            content: draftContent,
        });
        dispatch(updateTodoThunk({ todo: todoToUpdate }));
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
                onClick={() => dispatch(deleteTodoThunk({ todo }))}
            />
        );

        const markAsDoneButton = (
            <img
                src="/assets/check_icon.svg"
                onClick={() => dispatch(markTodoAsDoneThunk({ todo }))}
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
    }, [isEditingActive, dispatch, todo]);

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
                        onKeyDown={handleKeyDownOnInput}
                    />
                    <button onClick={submitEditing}>Save</button>
                </div>
            )}
            {actionsFragment}
        </div>
    );
};

export default TodoNode;
