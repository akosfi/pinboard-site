import Todo from 'modules/todos/domain/Todo';

interface UpdateTodoUseCaseRequest {
    todo: Todo;
}

interface UpdateTodoUseCaseResponse {
    todo: Todo;
}

export default class UpdateTodoUseCase {
    constructor(
        private readonly updateTodoUseCaseRequest: UpdateTodoUseCaseRequest,
    ) {}

    execute = async (): Promise<UpdateTodoUseCaseResponse> => {
        const { todo } = this.updateTodoUseCaseRequest;

        const updatedTodo = await todo.save();

        return { todo: updatedTodo };
    };
}
