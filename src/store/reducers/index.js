import {combineReducers} from "redux";
import flow from './flowReducer';
import details from "./detailsReducer";

export default combineReducers({
    flow,
    details
});