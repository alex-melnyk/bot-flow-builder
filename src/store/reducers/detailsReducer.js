import * as DetailsActions from "../actions/detailsActions";

const initialState = {
    selectedNode: {},
    visible: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DetailsActions.DETAILS_ACTION_DRAWER_OPEN:
            return {
                ...state,
                visible: true
            };
        case DetailsActions.DETAILS_ACTION_DRAWER_CLOSE:
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
};