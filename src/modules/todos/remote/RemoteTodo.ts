import Todo, { TodoDTO, TodoFactory } from '../domain/Todo';

export default class RemoteTodo extends Todo {
    save = () => {
        throw new Error('NOT_IMPLEMENTED');
    };
    delete = () => {
        throw new Error('NOT_IMPLEMENTED');
    };
    markDone = () => {
        throw new Error('NOT_IMPLEMENTED');
    };
}

export class RemoteTodoFactory implements TodoFactory {
    from = (todoDTO: TodoDTO) => new RemoteTodo(todoDTO); //TODO: pass axios client here
}
