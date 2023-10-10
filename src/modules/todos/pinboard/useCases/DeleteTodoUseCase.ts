import Todo from 'modules/todos/domain/Todo';

interface DeleteTodoUseCaseRequest {
    todo: Todo;
}

export default class DeleteTodoUseCase {
    constructor(
        private readonly deleteTodoUseCaseRequest: DeleteTodoUseCaseRequest,
    ) { }

    execute = async (): Promise<void> => {
        const { todo } = this.deleteTodoUseCaseRequest;

        await todo.delete();
    };
}
