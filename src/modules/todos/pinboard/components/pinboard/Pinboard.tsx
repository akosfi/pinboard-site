import React, { FC, useEffect, useMemo, MouseEvent, memo } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useNodesState,
    Node,
} from 'reactflow';

//TODO: check bundle size. Maybe load dynamically.

import TodoNode from './components/todo-node/TodoNode';
import TodoContextProvider from '../../context/TodoContextProvider';
import useTodoContext from '../../context/useTodoContext';
import Todo from 'modules/todos/domain/Todo';
import CreateTodoInput from './components/create-todo-input/CreateTodoInput';
import ErrorAlert from './components/error-alert/ErrorAlert';
import 'reactflow/dist/style.css';
import css from './Pinboard.module.scss';

const Pinboard: FC = () => {
    const [localNodeState, setLocalNodeState, onLocalNodeStateChange] =
        useNodesState([]);

    const { nodes, updateTodo } = useTodoContext();

    useEffect(() => {
        setLocalNodeState(nodes);
    }, [nodes, setLocalNodeState]);

    const handleNodeDragStop = (
        _event: MouseEvent,
        node: Node<{ todo: Todo }>,
    ) => {
        const { todo } = node.data;

        if (
            todo.metaData.position.x === node.position.x &&
            todo.metaData.position.y === node.position.y
        ) {
            return;
        }

        todo.metaData.position = { x: node.position.x, y: node.position.y };
        updateTodo(todo);
    };

    const nodeTypes = useMemo(() => ({ todoNode: TodoNode }), []);

    return (
        <div className={css['container']}>
            <CreateTodoInput />
            <ErrorAlert />
            <ReactFlow
                nodes={localNodeState}
                onNodesChange={onLocalNodeStateChange}
                onNodeDragStop={handleNodeDragStop}
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </div>
    );
};

const MemoizedPinboard = memo(Pinboard);

const PinboardWithContext = () => (
    <TodoContextProvider>
        <MemoizedPinboard />
    </TodoContextProvider>
);

export default PinboardWithContext;
