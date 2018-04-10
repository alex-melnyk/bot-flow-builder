import React, {Component} from 'react';
import GraphView from 'react-digraph';
import {DropTarget} from 'react-dnd';

import GraphConfig from './config';

const styles = {
    graph: {
        height: 'calc(100% - 64px)',
        width: '100%'
    }
};

const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
const EMPTY_TYPE = "empty"; // Empty node type
const SPECIAL_TYPE = "special";
const SPECIAL_CHILD_SUBTYPE = "specialChild";
const EMPTY_EDGE_TYPE = "emptyEdge";
const SPECIAL_EDGE_TYPE = "specialEdge";

class Graph extends Component {
    state = {
        selected: {}
    };

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

        this.props.updateNode(nodeIndex, viewNode);
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode, targetViewNode) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine edge type
        // const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type: EMPTY_EDGE_TYPE
        };

        this.props.addEdge(viewEdge);

        // Only add the edge when the source node is not the same as the target
        // if (viewEdge.source !== viewEdge.target) {
        //     graph.edges.push(viewEdge);
        //     this.setState({graph: graph});
        // }
    };


    /*
     * Handlers/Interaction
     */

    // Node 'mouseUp' handler
    onSelectNode = viewNode => {
        // Deselect events will send Null viewNode
        // if (!!viewNode) {
        //     this.setState({selected: viewNode});
        // } else {
        //     this.setState({selected: {}});
        // }
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge) => {
        // this.setState({selected: viewEdge});
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

    // Deletes a node from the graph
    onDeleteNode = viewNode => {
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

    // Called when an edge is deleted
    onDeleteEdge = viewEdge => {
        // const graph = this.state.graph;
        // const i = this.getEdgeIndex(viewEdge);
        // graph.edges.splice(i, 1);
        // this.setState({graph: graph, selected: {}});
    };

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge) {
        return this.props.edges.findIndex((edge) => edge.source === searchEdge.source && edge.target === searchEdge.target);
    }

    /*
     * Render
     */
    render() {
        const {
            selected
        } = this.state;

        const {
            nodes,
            edges,
            isOver,
            connectDropTarget
        } = this.props;

        const {
            NodeTypes,
            NodeSubtypes,
            EdgeTypes
        } = GraphConfig;

        if (this.GraphView) {
            console.log('GV', this.GraphView);
        }

        return connectDropTarget(
            <div id='graph' style={{
                ...styles.graph,
                opacity: isOver ? 0.75 : 1
            }}>

                <GraphView
                    ref={(ref) => this.GraphView = ref}
                    nodeKey={NODE_KEY}
                    emptyType={EMPTY_TYPE}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
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

                    minZoom={1}
                    maxZoom={1}
                    enableFocus={false}
                    gridSpacing={25}
                    gridDot={1}
                />
            </div>
        );
    }

}


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

        props.addNode(item.type, {
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
