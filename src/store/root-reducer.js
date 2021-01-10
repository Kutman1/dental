import {combineReducers} from "redux";
import authorizationReducer from "../pages/authorization/reducers";
import recordReducer from "../pages/addPatients/reducers";



const rootReducers = combineReducers({
    auth: authorizationReducer,
    record: recordReducer
});


export default rootReducers;
