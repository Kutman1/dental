import {REQUEST_ADD_RECORD, SUCCESS_ADD_RECORD} from "./actions";

let initialState = {
    loading: false,
    success: false
}

const recordReducer = (state = initialState, action) => {
    const {type} = action;

    switch (type) {
        case REQUEST_ADD_RECORD:
            return {
                ...state,
                loading: true
            }
        case SUCCESS_ADD_RECORD:
            return {
                ...state,
                loading: false,
                success: !state.success
            }
        default:
            return state;
    }
};


export default recordReducer
