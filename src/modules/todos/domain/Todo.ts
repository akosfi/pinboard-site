export enum TodoState {
    UNFINISHED = 'UNFINISHED',
    FINISHED = 'FINISHED',
}

export type TodoDTO = {
    id: string;
    content: string;
    state: TodoState;
    metaData: {
        position: { x: number; y: number };
    };
};

export default abstract class Todo implements TodoDTO {
    id: string;
    content: string;
    state: TodoState;

    /* I consider the "position" as part of the domain 
    on the frontend, but the metaData can be any JSON on the backend. 
    It should be either considered as a mandatory on backend 
    or optional on the frontend (with some fallback)
    to rule out any error caused by discrepancy between the two. */

    metaData: {
        position: { x: number; y: number };
    };

    constructor({ id, content, state, metaData }: TodoDTO) {
        this.id = id;
        this.content = content;
        this.state = state;
        this.metaData = metaData;
    }

    abstract save: () => Promise<Todo>;

    abstract delete: () => Promise<void>;

    abstract markAsDone: () => Promise<Todo>;

    isDone = () => this.state === TodoState.FINISHED;

    serialize = (): TodoDTO => ({
        id: this.id,
        content: this.content,
        state: this.state,
        metaData: this.metaData,
    });
}

export interface TodoFactory {
    from: (todoDTO: TodoDTO) => Todo;
}
