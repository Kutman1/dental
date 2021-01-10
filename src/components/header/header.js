import React from 'react';
import "./header.scss";
import {ExitHeaderIcon} from "../../icons/icons";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {logout} from "../../pages/authorization/actions";

const Header = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutUser = () => {
        dispatch(logout());
        history.push('/')
    }
    return (
        <div className="header">
            <div className="header__wrap">
                <div className="header__title">
                    {user.fullName}
                </div>
                <div className="header__exit" onClick={logoutUser}>
                    <span>Выход</span>
                    <ExitHeaderIcon/>
                </div>
            </div>
        </div>
    );
};

export default Header;
