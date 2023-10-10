import { RemoteTodoRepository } from 'modules/todos';
import { GetAllTodosUseCase } from 'modules/todos/pinboard';
import { useEffect } from 'react';
import axiosInstance from 'remote/axiosInstance';

const Index = () => {
    //TODO: remove this useeffect
    useEffect(() => {
        (async () => {
            console.log(
                await new GetAllTodosUseCase({
                    todoRepository: new RemoteTodoRepository(axiosInstance),
                }).execute(),
            );
        })();
    }, []);

    return <p>Hello</p>;
};

export default Index;
