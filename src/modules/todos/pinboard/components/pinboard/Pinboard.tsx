import React, { FC, useEffect, useMemo } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    useNodesState,
} from 'reactflow';

//TODO: check bundle size. Maybe load dynamically.

import 'reactflow/dist/style.css';

import TodoNode from './components/todo-node/TodoNode';
import TodoContextProvider from '../../context/TodoContextProvider';
import useTodoContext from '../../context/useTodoContext';

const Pinboard: FC = () => {
    const [localNodeState, setLocalNodeState, onLocalNodeStateChange] =
        useNodesState([]);

    const { nodes } = useTodoContext();

    useEffect(() => {
        setLocalNodeState(nodes);
    }, [nodes, setLocalNodeState]);

    const nodeTypes = useMemo(() => ({ todoNode: TodoNode }), []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={localNodeState}
                onNodesChange={onLocalNodeStateChange}
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

const PinboardWithContext = () => (
    <TodoContextProvider>
        <Pinboard />
    </TodoContextProvider>
);

export default PinboardWithContext;
