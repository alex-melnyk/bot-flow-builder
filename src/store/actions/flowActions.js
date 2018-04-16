import {BlockMocks} from "../../types/blockMocks";

export const FLOW_ACTION_UPDATE_NODE = 'FLOW_ACTION_UPDATE_NODE';
export const FLOW_ACTION_ADD_NODE = 'FLOW_ACTION_ADD_NODE';
export const FLOW_ACTION_ADD_EDGE = 'FLOW_ACTION_ADD_EDGE';
export const FLOW_ACTION_SET_SELECTED_NODE = 'FLOW_ACTION_SET_SELECTED_NODE';
export const FLOW_ACTION_DELETE_NODE = 'FLOW_ACTION_DELETE_NODE';
export const FLOW_ACTION_DELETE_EDGE = 'FLOW_ACTION_DELETE_EDGE';

/**
 *
 * @param index number of element in nodes array.
 * @param node sources object.
 */
export function updateNodeAction({index, node}) {
    return {
        type: FLOW_ACTION_UPDATE_NODE,
        payload: {
            index,
            node
        }
    };
}

/**
 *
 * @param nodeType {String} type of node
 * @param location {Object} point of creation new node.
 * @param location.x {Number} horizontal location of point.
 * @param location.y {Number} vertical location of point.
 */
export function addNodeAction(nodeType, location) {
    const block = BlockMocks.find((mock) => mock.type === nodeType);

    return {
        type: FLOW_ACTION_ADD_NODE,
        payload: {
            block,
            location
        }
    };
}

/**
 *
 * @param nodesEdge
 */
export function addEdgeAction(nodesEdge) {
    return {
        type: FLOW_ACTION_ADD_EDGE,
        payload: {
            nodesEdge
        }
    };
}

/**
 *
 * @param selectedNode
 */
export function setSelectedNodeAction(selectedNode = {}) {
    return {
        type: FLOW_ACTION_SET_SELECTED_NODE,
        payload: {selectedNode}
    }
}

/**
 * Delete node with edge.
 *
 * @param nodeId id of node which need delete.
 */
export function deleteNodeAction(nodeId) {
    return {
        type: FLOW_ACTION_DELETE_NODE,
        payload: {nodeId}
    };
}

/**
 * Delete directional edge between source and target.
 *
 * @param sourceId id of source node.
 * @param targetId id of target node.
 */
export function deleteEdgeAction(sourceId, targetId) {
    return {
        type: FLOW_ACTION_DELETE_EDGE,
        payload: {
            sourceId,
            targetId
        }
    };
}