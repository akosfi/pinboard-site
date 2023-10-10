import { RemoteTodoRepository } from 'modules/todos';
import { GetAllTodosUseCase } from 'modules/todos/pinboard';
import { useEffect } from 'react';

const Index = () => {
    //TODO: remove this useeffect
    useEffect(() => {
        (async () => {
            console.log(
                await new GetAllTodosUseCase({
                    todoRepository: new RemoteTodoRepository(),
                }).execute(),
            );
        })();
    }, []);

    return <p>Hello</p>;
};

export default Index;
