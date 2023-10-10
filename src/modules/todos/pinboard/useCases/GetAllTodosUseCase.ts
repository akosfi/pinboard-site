import Todo from 'modules/todos/domain/Todo';
import TodoRepository from 'modules/todos/domain/TodoRepository';

interface GetAllTodosUseCaseRequest {
    todoRepository: TodoRepository;
}

interface GetAllTodosUseCaseResponse {
    todos: Todo[];
}

export default class GetAllTodosUseCase {
    constructor(
        private readonly getAllTodosUseCaseRequest: GetAllTodosUseCaseRequest,
    ) {}

    execute = async (): Promise<GetAllTodosUseCaseResponse> => {
        const { todoRepository } = this.getAllTodosUseCaseRequest;

        const todos = await todoRepository.getAll();

        return { todos };
    };
}
