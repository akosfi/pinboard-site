export enum TodoState {
    UNFINISHED = 'UNFINISHED',
    FINISHED = 'FINISHED',
}

export type TodoDTO = {
    id: string;
    content: string;
    status: TodoState;
    metaInformation: Record<string, string>;
};

export default abstract class Todo implements TodoDTO {
    id: string;
    content: string;
    status: TodoState;
    metaInformation: Record<string, string>;

    constructor({ id, content, status, metaInformation }: TodoDTO) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.metaInformation = metaInformation;
    }

    abstract save: () => Promise<Todo>;

    abstract delete: () => Promise<void>;

    abstract markDone: () => Promise<void>;
}

export interface TodoFactory {
    from: (todoDTO: TodoDTO) => Todo;
}
