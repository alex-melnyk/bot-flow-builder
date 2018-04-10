import uuid from "uuid";

import * as FlowActions from '../actions/flowActions';

const initialState = {
    nodes: [],
    edges: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FlowActions.FLOW_ACTION_UPDATE_NODE:
            return {
                ...state,
                nodes: Object.assign(
                    [],
                    state.nodes,
                    {[action.payload.index]: action.payload.node}
                )
            };
        case FlowActions.FLOW_ACTION_ADD_NODE: {
            const {block, location} = action.payload;

            return {
                ...state,
                nodes: [
                    ...state.nodes,
                    {
                        id: uuid(),
                        title: block.header,
                        type: block.type,
                        ...location
                    }
                ]
            };
        }
        case FlowActions.FLOW_ACTION_ADD_EDGE:
            return {
                ...state,
                edges: [
                    ...state.edges,
                    action.payload.nodesEdge
                ]
            };
        default:
            return state;
    }
};