import axios, { type AxiosResponse } from 'axios';
import TodoRepository from '../domain/TodoRepository';
import { TodoDTO } from '../domain/Todo';
import { RemoteTodoFactory } from './RemoteTodo';

export default class RemoteTodoRepository extends TodoRepository {
    getAll = async () => {
        //TODO: move axios client somewhere common
        const {
            data: { content },
        }: AxiosResponse<{ content: TodoDTO[] }> = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
        );
        return content.map(new RemoteTodoFactory().from);
    };
}
