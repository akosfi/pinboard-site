import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import TodoRepository from '../domain/TodoRepository';
import { TodoDTO } from '../domain/Todo';
import { RemoteTodoFactory } from './RemoteTodo';

export default class RemoteTodoRepository extends TodoRepository {
    constructor(private readonly axiosInstance: AxiosInstance) {
        super();
    }


    getAll = async () => {
        const {
            data: { content },
        }: AxiosResponse<{ content: TodoDTO[] }> = await this.axiosInstance.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
        );

        return content.map(new RemoteTodoFactory().from);
    };
}
