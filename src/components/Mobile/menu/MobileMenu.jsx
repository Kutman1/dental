import React, {useState} from 'react';
import {ProfileIcon, RecordMobileIcon} from "../../../icons/icons";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../pages/authorization/actions";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';

import EditIcon from '@material-ui/icons/Edit';
import {Edit} from "@material-ui/icons";
const MobileMenu = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const profilePath = useLocation().pathname === '/profile'
    const logoutUser = () => {
        dispatch(logout());
        history.push('/')
    }
    const actions = [
        { icon: <AddIcon />, name: 'Написать доктору' },
        { icon: <EditIcon />, name: 'Написать доктору' }
    ];
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className="mobile__menu">
            <SpeedDial
                className="speeDial"
                ariaLabel="SpeedDial example"
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                <SpeedDialAction
                    icon={<AddIcon/>}
                    tooltipTitle='Добавить запись'
                    tooltipOpen
                    onClick={() => history.push(`/add/patients`)}
                />
                <SpeedDialAction
                    icon={<EditIcon/>}
                    tooltipTitle='Написать доктору'
                    tooltipOpen
                    onClick={() => window.open('https://www.youtube.com/')}
                />
            </SpeedDial>
            {profilePath && <div className="mobile__menu-exit" onClick={logoutUser}>
                Выход
            </div>}
            <div className="mobile__menu-wrap">
                <NavLink to='/my/records' className="mobile__menu-item">
                    <RecordMobileIcon/>
                    <div>Мои записи</div>
                </NavLink>
                <NavLink to='/profile' className="mobile__menu-item">
                    <ProfileIcon/>
                    <div>Профиль</div>
                </NavLink>
            </div>
        </div>
    );
};

export default MobileMenu;