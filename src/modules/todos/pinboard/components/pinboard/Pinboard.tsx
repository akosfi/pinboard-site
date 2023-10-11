import React, { FC, useEffect, useMemo, MouseEvent } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useNodesState,
    Node,
} from 'reactflow';

import TodoNode from './components/todo-node/TodoNode';
import Todo from 'modules/todos/domain/Todo';
import CreateTodoInput from './components/create-todo-input/CreateTodoInput';
import ErrorAlert from './components/error-alert/ErrorAlert';
import 'reactflow/dist/style.css';
import css from './Pinboard.module.scss';
import { RemoteTodoFactory } from 'modules/todos/remote/RemoteTodo';
import { useDispatch, useSelector } from 'react-redux';
import pinboardSelectors from '../../redux/selectors';
import { AppDispatch } from 'redux/store';
import getAllTodosThunk from '../../redux/thunks/getAllTodosThunk';
import updateTodoThunk from '../../redux/thunks/updateTodoThunk';

const Pinboard: FC = () => {
    const [localNodeState, setLocalNodeState, onLocalNodeStateChange] =
        useNodesState([]);

    const isUserActionInProgress = useSelector(
        pinboardSelectors.getIsUserActionInProgress,
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllTodosThunk());
    }, [dispatch]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (!isUserActionInProgress) {
            interval = setInterval(() => dispatch(getAllTodosThunk()), 5000);
        }

        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, [dispatch, isUserActionInProgress]);

    const nodes = useSelector(pinboardSelectors.getNodes);

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

        const todoToUpdate = new RemoteTodoFactory().from({
            ...todo.serialize(),
            metaData: {
                ...todo.metaData,
                position: { x: node.position.x, y: node.position.y },
            },
        });
        dispatch(updateTodoThunk({ todo: todoToUpdate }));
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

export default Pinboard;
