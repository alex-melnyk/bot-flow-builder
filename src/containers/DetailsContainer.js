import {connect} from "react-redux";
import Details from "../components/Details";
import {drawerCloseAction} from "../store/actions/detailsActions";

export default connect((state) => ({
    ...state.details,
    selectedNode: state.flow.selectedNode
}), {
    drawerCloseAction
})(Details);