import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import createTodoThunk from 'modules/todos/pinboard/redux/thunks/createTodoThunk';

import css from './CreateTodoInput.module.scss';

const CreateTodoInput: FC = () => {
    const [newTodoContent, setNewTodoContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = () => {
        if (!newTodoContent) {
            return;
        }

        dispatch(createTodoThunk({ newTodoContent }));
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
