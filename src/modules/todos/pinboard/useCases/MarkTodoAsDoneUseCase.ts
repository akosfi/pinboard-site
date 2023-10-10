import Todo from 'modules/todos/domain/Todo';

interface MarkTodoAsDoneUseCaseRequest {
    todo: Todo;
}

interface MarkTodoAsDoneUseCaseResponse {
    todo: Todo;
}

export default class MarkTodoAsDoneUseCase {
    constructor(
        private readonly markTodoAsDoneUseCaseRequest: MarkTodoAsDoneUseCaseRequest,
    ) {}

    execute = async (): Promise<MarkTodoAsDoneUseCaseResponse> => {
        const { todo } = this.markTodoAsDoneUseCaseRequest;

        const todoMarkedAsDone = await todo.markAsDone();

        return { todo: todoMarkedAsDone };
    };
}
