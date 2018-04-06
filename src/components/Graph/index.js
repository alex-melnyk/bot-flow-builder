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

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
const DATA = {
    "nodes": [
        {
            "id": 1,
            "title": "Node A",
            "x": 258.3976135253906,
            "y": 331.9783248901367,
            "type": SPECIAL_TYPE
        },
        {
            "id": 2,
            "title": "Node B",
            "x": 593.9393920898438,
            "y": 260.6060791015625,
            "type": EMPTY_TYPE,
            "subtype": SPECIAL_CHILD_SUBTYPE
        },
        {
            "id": 3,
            "title": "Node C",
            "x": 237.5757598876953,
            "y": 61.81818389892578,
            "type": EMPTY_TYPE
        },
        {
            "id": 4,
            "title": "Node C",
            "x": 600.5757598876953,
            "y": 600.81818389892578,
            "type": EMPTY_TYPE
        }
    ],
    "edges": [
        {
            "source": 1,
            "target": 2,
            "type": SPECIAL_EDGE_TYPE
        },
        {
            "source": 2,
            "target": 4,
            "type": EMPTY_EDGE_TYPE
        }
    ]
};

class Graph extends Component {
    state = {
        graph: DATA,
        selected: {}
    };

    // Given a nodeKey, return the corresponding node
    getViewNode = nodeKey => {
        const searchNode = {};
        searchNode[NODE_KEY] = nodeKey;

        const i = this.getNodeIndex(searchNode);
        return this.state.graph.nodes[i]
    };

    // to sync updates from D3 with the graph
    onUpdateNode = viewNode => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);

        graph.nodes[i] = viewNode;
        this.setState({graph: graph});
    };


    /*
     * Handlers/Interaction
     */

    // Node 'mouseUp' handler
    onSelectNode = viewNode => {
        // Deselect events will send Null viewNode
        if (!!viewNode) {
            this.setState({selected: viewNode});
        } else {
            this.setState({selected: {}});
        }
    };

    // Edge 'mouseUp' handler
    onSelectEdge = (viewEdge) => {
        this.setState({selected: viewEdge});
    };

    // Called by 'drag' handler, etc..
    // Updates the graph with a new node
    onCreateNode = (x, y) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = Math.random() < 0.25 ? SPECIAL_TYPE : EMPTY_TYPE;

        const viewNode = {
            id: this.state.graph.nodes.length + 1,
            title: '',
            type: type,
            x: x,
            y: y
        };

        graph.nodes.push(viewNode);
        this.setState({graph: graph});
    };

    // Deletes a node from the graph
    onDeleteNode = viewNode => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);
        graph.nodes.splice(i, 1);

        // Delete any connected edges
        const newEdges = graph.edges.filter((edge) => {
            return edge.source !== viewNode[NODE_KEY] &&
                edge.target !== viewNode[NODE_KEY]
        });

        graph.edges = newEdges;

        this.setState({graph: graph, selected: {}});
    };

    // Creates a new node between two edges
    onCreateEdge = (sourceViewNode, targetViewNode) => {
        const graph = this.state.graph;

        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type: type
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges.push(viewEdge);
            this.setState({graph: graph});
        }
    };

    // Called when an edge is reattached to a different target.
    onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
        const graph = this.state.graph;
        const i = this.getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;

        this.setState({graph: graph});
    };

    // Called when an edge is deleted
    onDeleteEdge = viewEdge => {
        const graph = this.state.graph;
        const i = this.getEdgeIndex(viewEdge);
        graph.edges.splice(i, 1);
        this.setState({graph: graph, selected: {}});
    };

    // Helper to find the index of a given node
    getNodeIndex(searchNode) {
        return this.state.graph.nodes.findIndex((node) => {
            return node[NODE_KEY] === searchNode[NODE_KEY]
        })
    }

    // Helper to find the index of a given edge
    getEdgeIndex(searchEdge) {
        return this.state.graph.edges.findIndex((edge) => {
            return edge.source === searchEdge.source &&
                edge.target === searchEdge.target
        })
    }

    /*
     * Render
     */
    render() {
        const nodes = this.state.graph.nodes;
        const edges = this.state.graph.edges;
        const selected = this.state.selected;

        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;

        const {isOver, canDrop, connectDropTarget} = this.props;

        return connectDropTarget(
            <div id='graph' style={{
                ...styles.graph,
                opacity: isOver ? 0.5 : 1
            }}>

                <GraphView
                    ref={(el) => this.GraphView = el}
                    nodeKey={NODE_KEY}
                    emptyType={EMPTY_TYPE}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    enableFocus={true}
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
                />
            </div>
        );
    }

}


export default DropTarget('card', {
    canDrop: (props, monitor) => {
        // You can disallow drop based on props or item
        const item = monitor.getItem();
        console.log('canDrop', item, props);
        return true;//canMakeChessMove(item.fromPosition, props.position);
    },
    hover: (props, monitor, component) => {
        // This is fired very often and lets you perform side effects
        // in response to the hover. You can't handle enter and leave
        // here—if you need them, put monitor.isOver() into collect() so you
        // can just use componentWillReceiveProps() to handle enter/leave.

        // You can access the coordinates if you need them
        // const clientOffset = monitor.getClientOffset();
        // const componentRect = findDOMNode(component).getBoundingClientRect();

        // You can check whether we're over a nested drop target
        // const isJustOverThisOne = monitor.isOver({ shallow: true });

        // You will receive hover() even for items for which canDrop() is false
        console.log('hover');
        const canDrop = monitor.canDrop();
    },
    drop: (props, monitor, component) => {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return;
        }

        // Obtain the dragged item
        const item = monitor.getItem();
        console.log('drop', item);

        // You can do something with it
        // ChessActions.movePiece(item.fromPosition, props.position);

        // You can also do nothing and return a drop result,
        // which will be available as monitor.getDropResult()
        // in the drag source's endDrag() method
        return {moved: true};
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
