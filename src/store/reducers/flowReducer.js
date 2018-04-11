import uuid from "uuid";

import * as FlowActions from '../actions/flowActions';
import * as DetailsActions from "../actions/detailsActions";
import * as ImportExportActions from "../actions/importExportActions";

const initialState = {
    nodes: [],
    edges: [],
    selectedNode: {}
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
        case FlowActions.FLOW_ACTION_SET_SELECTED_NODE:
            return {
                ...state,
                ...action.payload
            };
        case DetailsActions.DETAILS_ACTION_DRAWER_CLOSE:
            return {
                ...state,
                selectedNode: {}
            };
        case ImportExportActions.IMPORT_ACTION_DATA_LOADED:
            return {
                ...initialState,
                ...action.payload
            };
        default:
            return state;
    }
};