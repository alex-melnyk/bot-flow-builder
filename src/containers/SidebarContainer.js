import {connect} from "react-redux";
import Sidebar from "../components/Sidebar";
import {flowExportAction, flowImportAction} from "../store/actions/importExportActions";

export default connect((state) => ({
    exportFlow: state.flow.exportFlow
}), {
    flowImportAction,
    flowExportAction
})(Sidebar);