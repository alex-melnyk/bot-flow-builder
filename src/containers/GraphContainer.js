import {connect} from "react-redux";
import Graph from '../components/Graph';
import {addEdgeAction, addNodeAction, setSelectedNode, updateNodeAction} from '../store/actions/flowActions';
import {drawerCloseAction, drawerOpenAction} from "../store/actions/detailsActions";

export default connect((state) => ({
    ...state.flow
}), {
    updateNodeAction,
    addNodeAction,
    addEdgeAction,
    setSelectedNode,
    drawerOpenAction,
    drawerCloseAction
})(Graph);