import {connect} from "react-redux";
import Sidebar from "../components/Sidebar";
import {dataLoadedAction} from "../store/actions/importExportActions";

export default connect((state) => ({}), {
    dataLoadedAction
})(Sidebar);