import Todo from './Todo';

export default abstract class TodoRepository {
    abstract getAll: () => Promise<Todo[]>;

    abstract create: (content: string) => Promise<void>;
}
