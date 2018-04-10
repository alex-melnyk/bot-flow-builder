import {BlockMocks} from "../../types/blockMocks";

export const FLOW_ACTION_UPDATE_NODE = 'FLOW_ACTION_UPDATE_NODE';
export const FLOW_ACTION_ADD_NODE = 'FLOW_ACTION_ADD_NODE';
export const FLOW_ACTION_ADD_EDGE = 'FLOW_ACTION_ADD_EDGE';

/**
 *
 * @param index number of element in nodes array.
 * @param node sources object.
 */
export function updateNode({index, node}) {
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
export function addNode(nodeType, location) {
    return {
        type: FLOW_ACTION_ADD_NODE,
        payload: {
            block: BlockMocks.find((mock) => mock.type === nodeType),
            location
        }
    };
}

export function addEdge(nodesEdge) {
    return {
        type: FLOW_ACTION_ADD_EDGE,
        payload: {
            nodesEdge
        }
    };
}