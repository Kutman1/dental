import {CHANGE_PHOTO, LOGOUT_AUTH, REQUEST_AUTH, SUCCESS_AUTH} from "./actions";
import {localStorageGetItem, localStorageSetItem, localStorageSetToken} from "../../utils/storage";

let initialState = {
    user: localStorageGetItem("user"),
    token: localStorageGetItem("token"),
    request: false,
};


const authorizationReducer = (state = initialState, action) => {
    console.log(state.user)
    const {payload, type} = action;
    switch (type) {
        case REQUEST_AUTH:
            return {
                ...state,
                request: true
            };
        case SUCCESS_AUTH:
            localStorageSetToken("token", payload.token);
            localStorageSetItem("user", payload.user);
            return {
                ...state,
                request: false,
                user: payload.user,
                token: payload.token
            };
        case CHANGE_PHOTO:
            return {
                ...state,
                request: false,
                user: {
                    ...state.user,
                    photo: payload.photo
                }
            };
        case LOGOUT_AUTH:
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }


};


export default authorizationReducer;
