import { AxiosInstance, AxiosResponse } from 'axios';
import Todo, { TodoDTO, TodoFactory, TodoState } from '../domain/Todo';
import axiosInstance from 'remote/axiosInstance';

export default class RemoteTodo extends Todo {
    constructor(
        todoDTO: TodoDTO,
        private readonly axiosInstance: AxiosInstance,
    ) {
        super(todoDTO);
    }

    save = async () => {
        await this.axiosInstance.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
            {
                id: this.id,
                content: this.content,
                state: this.state,
                metaData: this.metaData,
            },
        );

        return await this.fetch();
    };

    delete = async () => {
        await this.axiosInstance.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${this.id}`,
        );
    };

    markAsDone = async () => {
        await this.axiosInstance.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
            {
                id: this.id,
                content: this.content,
                state: TodoState.FINISHED,
                metaData: this.metaData,
            },
        );

        return await this.fetch();
    };

    private fetch = async () => {
        const {
            data: { content },
        }: AxiosResponse<{ content: TodoDTO[] }> = await this.axiosInstance.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
        );

        const todo = content.find(({ id }) => id === this.id);

        if (!todo) {
            throw new Error('Todo not found!');
        }

        return new RemoteTodoFactory().from(todo);
    };
}

export class RemoteTodoFactory implements TodoFactory {
    from = (todoDTO: TodoDTO) => new RemoteTodo(todoDTO, axiosInstance);
}
