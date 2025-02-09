import uuid from "uuid";

import * as FlowActions from '../actions/flowActions';
import * as DetailsActions from "../actions/detailsActions";
import * as ImportExportActions from "../actions/importExportActions";

const initialState = {
    nodes: [],
    edges: [],
    selectedNode: {},
    exportFlow: null
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
        case FlowActions.FLOW_ACTION_DELETE_NODE:
            return {
                ...state,
                nodes: state.nodes.filter((node) => node.id !== action.payload.nodeId),
                edges: state.edges.filter((edge) => edge.source !== action.payload.nodeId && edge.target !== action.payload.nodeId)
            };
        case FlowActions.FLOW_ACTION_DELETE_EDGE:
            return {
                ...state,
                edges: state.edges.filter((edge) => edge.source !== action.payload.sourceId && edge.target !== action.payload.targetId)
            };
        case DetailsActions.DETAILS_ACTION_DRAWER_CLOSE:
            return {
                ...state,
                selectedNode: {}
            };
        case ImportExportActions.EXPORT_ACTION_DATA_BUILT:
            return {
                ...state,
                ...action.payload
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