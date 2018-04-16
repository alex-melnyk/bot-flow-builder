import {connect} from "react-redux";
import Graph from '../components/Graph';
import {
    addEdgeAction,
    addNodeAction,
    deleteEdgeAction,
    deleteNodeAction,
    setSelectedNodeAction,
    updateNodeAction
} from '../store/actions/flowActions';
import {drawerCloseAction, drawerOpenAction} from "../store/actions/detailsActions";

export default connect((state) => ({
    ...state.flow
}), {
    updateNodeAction,
    addNodeAction,
    addEdgeAction,
    setSelectedNodeAction,
    deleteNodeAction,
    deleteEdgeAction,
    drawerOpenAction,
    drawerCloseAction
})(Graph);