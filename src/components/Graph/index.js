import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GraphView from 'react-digraph';
import {DropTarget} from 'react-dnd';

import GraphConfig from './config';

const styles = {
    graph: {
        height: 'calc(100% - 64px)',
        width: '100%',
        fontFamily: 'Roboto'
    }
};

const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
const EMPTY_TYPE = "empty"; // Empty node type

class Graph extends Component {
    // Helper to find the index of a given node
    getNodeIndex = (searchNode) => {
        return this.props.nodes.find((node) => node[NODE_KEY] === searchNode[NODE_KEY]);
    };

    // Given a nodeKey, return the corresponding node
    getViewNode = (nodeKey) => this.getNodeIndex({
        [NODE_KEY]: nodeKey
    });

    // to sync updates from D3 with the graph
    onUpdateNode = (viewNode) => {
        const nodeIndex = this.props.nodes.findIndex((node) => node[NODE_KEY] === viewNode[NODE_KEY]);

        this.props.updateNodeAction(nodeIndex, viewNode);
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode, targetViewNode) => {
        this.props.addEdgeAction({
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type: "emptyEdge"
        });
    };

    // Deletes a node from the graph
    onDeleteNode = (viewNode) => {
        // const graph = this.state.graph;
        // const i = this.getNodeIndex(viewNode);
        // graph.nodes.splice(i, 1);
        //
        // // Delete any connected edges
        // const newEdges = graph.edges.filter((edge) => {
        //     return edge.source !== viewNode[NODE_KEY] &&
        //         edge.target !== viewNode[NODE_KEY]
        // });
        //
        // graph.edges = newEdges;
        //
        // this.setState({graph: graph, selected: {}});

        this.props.deleteNodeAction(viewNode.id);
    };

    // Called when an edge is deleted
    onDeleteEdge = (viewEdge) => {
        // const graph = this.state.graph;
        // const i = this.getEdgeIndex(viewEdge);
        // graph.edges.splice(i, 1);
        // this.setState({graph: graph, selected: {}});

        this.props.deleteEdgeAction(viewEdge.source, viewEdge.target);
    };

    /*
     * Handlers/Interaction
     */

    // Node 'mouseUp' handler
    onSelectNode = (viewNode) => {
        const {
            selectedNode,
            setSelectedNodeAction,
            drawerCloseAction,
            drawerOpenAction
        } = this.props;

        if (selectedNode && !viewNode) {
            setSelectedNodeAction();
            drawerCloseAction();
        } else {
            setSelectedNodeAction(viewNode);
        }

        if (viewNode && selectedNode && viewNode.id === selectedNode.id) {
            drawerOpenAction();
        }
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge) => {
        this.props.setSelectedNodeAction(viewEdge);
    };

    // Called by 'drag' handler, etc..
    // Updates the graph with a new node
    onCreateNode = (x, y) => {
        // const graph = this.state.graph;
        //
        // // This is just an example - any sort of logic
        // // could be used here to determine node type
        // // There is also support for subtypes. (see 'sample' above)
        // // The subtype geometry will underlay the 'type' geometry for a node
        // const type = Math.random() < 0.25 ? SPECIAL_TYPE : EMPTY_TYPE;
        //
        // const viewNode = {
        //     id: this.state.graph.nodes.length + 1,
        //     title: '',
        //     type: type,
        //     x: x,
        //     y: y
        // };
        //
        // graph.nodes.push(viewNode);
        // this.setState({graph: graph});
    };

    // Called when an edge is reattached to a different target.
    onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
        // const graph = this.state.graph;
        // const i = this.getEdgeIndex(viewEdge);
        // const edge = JSON.parse(JSON.stringify(graph.edges[i]));
        //
        // edge.source = sourceViewNode[NODE_KEY];
        // edge.target = targetViewNode[NODE_KEY];
        // graph.edges[i] = edge;
        //
        // this.setState({graph: graph});
    };

    /*
     * Render
     */
    render() {
        const {
            nodes,
            edges,
            selectedNode,
            isOver,
            connectDropTarget
        } = this.props;

        const {
            NodeTypes,
            NodeSubtypes,
            EdgeTypes
        } = GraphConfig;

        return connectDropTarget(
            <div id='graph' style={{
                ...styles.graph,
                opacity: isOver ? 0.75 : 1
            }}>
                <GraphView
                    nodeKey={NODE_KEY}

                    nodes={nodes}
                    edges={edges}
                    selected={selectedNode}

                    emptyType={EMPTY_TYPE}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}

                    getViewNode={this.getViewNode}
                    onSelectNode={this.onSelectNode}
                    onCreateNode={this.onCreateNode}
                    onUpdateNode={this.onUpdateNode}
                    onDeleteNode={this.onDeleteNode}
                    onSelectEdge={this.onSelectEdge}
                    onCreateEdge={this.onCreateEdge}
                    onSwapEdge={this.onSwapEdge}
                    onDeleteEdge={this.onDeleteEdge}

                    graphControls={false}
                    enableFocus={false}
                    minZoom={0.5}
                    maxZoom={1}
                    gridSpacing={25}
                    gridDot={1}
                />
            </div>
        );
    }
}

Graph.propTypes = {
    nodes: PropTypes.array,
    edges: PropTypes.array,
    updateNodeAction: PropTypes.func.isRequired,
    addNodeAction: PropTypes.func.isRequired,
    addEdgeAction: PropTypes.func.isRequired,
    setSelectedNodeAction: PropTypes.func.isRequired,
    deleteNodeAction: PropTypes.func.isRequired,
    deleteEdgeAction: PropTypes.func.isRequired,
    drawerOpenAction: PropTypes.func.isRequired,
};

export default DropTarget('card', {
    canDrop: (props, monitor) => {
        // You can disallow drop based on props or item
        // const item = monitor.getItem();
        // console.log('canDrop', item, props);
        return true;//canMakeChessMove(item.fromPosition, props.position);
    },
    drop: (props, monitor, component) => {
        if (monitor.didDrop()) {
            return;
        }

        // Obtain the dragged item
        const item = monitor.getItem();
        const location = monitor.getSourceClientOffset();

        props.addNodeAction(item.type, {
            x: location.x - 175,
            y: location.y - 32
        });
    }
}, (connect, monitor) => ({
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))(Graph);
