import {connect} from "react-redux";
import Graph from '../components/Graph';
import {
    addEdge,
    addNode,
    updateNode
} from '../store/actions/flowActions';

export default connect((state) => ({
    ...state.flow
}), {
    updateNode,
    addNode,
    addEdge
})(Graph);