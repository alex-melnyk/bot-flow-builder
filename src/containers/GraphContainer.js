import {connect} from "react-redux";
import Graph from '../components/Graph';

export default connect((state) => ({
    ...state.flow
}), {
    // ACTIONS
})(Graph);