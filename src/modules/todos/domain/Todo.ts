export enum TodoState {
    UNFINISHED = 'UNFINISHED',
    FINISHED = 'FINISHED',
}

export type TodoDTO = {
    id: string;
    content: string;
    state: TodoState;
    metaInformation: Record<string, string>;
};

export default abstract class Todo implements TodoDTO {
    id: string;
    content: string;
    state: TodoState;
    metaInformation: Record<string, string>;

    constructor({ id, content, state, metaInformation }: TodoDTO) {
        this.id = id;
        this.content = content;
        this.state = state;
        this.metaInformation = metaInformation;
    }

    abstract save: () => Promise<Todo>;

    abstract delete: () => Promise<void>;

    abstract markAsDone: () => Promise<Todo>;
}

export interface TodoFactory {
    from: (todoDTO: TodoDTO) => Todo;
}
