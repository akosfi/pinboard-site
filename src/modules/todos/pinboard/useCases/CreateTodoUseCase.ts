import Todo from 'modules/todos/domain/Todo';
import TodoRepository from 'modules/todos/domain/TodoRepository';

interface CreateTodoUseCaseRequest {
    todoRepository: TodoRepository;
    newTodoContent: string;
}

interface CreateTodoUseCaseResponse {
    todos: Todo[];
}

export default class CreateTodoUseCase {
    constructor(
        private readonly CreateTodoUseCaseRequest: CreateTodoUseCaseRequest,
    ) {}

    execute = async (): Promise<CreateTodoUseCaseResponse> => {
        const { todoRepository, newTodoContent } =
            this.CreateTodoUseCaseRequest;

        await todoRepository.create(newTodoContent);
        const todos = await todoRepository.getAll();

        return { todos };
    };
}
