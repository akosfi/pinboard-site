import { useContext } from 'react';
import todoContext from './todoContext';

const useTodoContext = () => {
    const context = useContext(todoContext);
    return context;
};

export default useTodoContext;
