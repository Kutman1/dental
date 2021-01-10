import AuthAPI from "../../api/auth/AuthAPI";
import UserAPI from "../../api/users/UserAPI";
import {localStorageSetItem} from "../../utils/storage";

export const REQUEST_AUTH = "REQUEST_AUTH";
export const SUCCESS_AUTH = "SUCCESS_AUTH";
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const CHANGE_PHOTO = "CHANGE_PHOTO";
const requestAuth = () => ({
    type: REQUEST_AUTH
});

const successAuth = (user, token) => ({
    type: SUCCESS_AUTH,
    payload: {user, token}
});


export const authenticationAction = (data) => async dispatch => {
    dispatch(requestAuth());
    try {
        const result = await AuthAPI.createUser(data);
        const {user, token} = result.data;
        dispatch(successAuth(user, token))
    } catch (e) {
        console.log(e.message)
    }
};

export const loginUser = (data) => async dispatch => {
    dispatch(requestAuth());
    try {
        const result = await AuthAPI.loginUser(data);
        const {user, token} = result.data;
        dispatch(successAuth(user, token))
    } catch (e) {
        console.log(e.message)
    }
};

const uploadSuccess = (photo) => ({
    type: CHANGE_PHOTO,
    payload: {photo}
})

export const uploadPhoto = (photo) => async (dispatch, getState) => {
    dispatch(requestAuth());
    console.log(photo)
    try {
        await UserAPI.uploadPhoto(photo);
        let user = getState().auth.user;
        localStorageSetItem("user", {...user, photo});
        dispatch(uploadSuccess(photo))
    } catch (e) {
        console.log(e.message)
    }
}


export const logout = () => dispatch => {
    localStorage.clear();
    dispatch({type: LOGOUT_AUTH})
};
