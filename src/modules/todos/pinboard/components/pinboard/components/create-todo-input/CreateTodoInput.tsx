import { FC, useState } from 'react';

import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';

import css from './CreateTodoInput.module.scss';

const CreateTodoInput: FC = () => {
    const [newTodoContent, setNewTodoContent] = useState('');

    const { createTodo } = useTodoContext();

    const handleSubmit = () => {
        if (!newTodoContent) {
            return;
        }

        createTodo(newTodoContent);
        setNewTodoContent('');
    };

    return (
        <div className={css['overlay']}>
            <input
                className={css['textInput']}
                type="text"
                placeholder="Enter your new todo here..."
                value={newTodoContent}
                onChange={(e) => setNewTodoContent(e.target.value)}
            />
            <button className={css['submit']} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CreateTodoInput;
