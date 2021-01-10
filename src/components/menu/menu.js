import React, {useState} from 'react';
import "./menu.scss";
import {Link, NavLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {AddUser, NewsIcon, UsersIcon} from "../../icons/menuIcons/menuIcons";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {LineIcon, PatientsIcon, StatisticIcon} from "../../icons/icons";
import {useSelector} from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import {randomColor} from "../../utils/randomColor";
import ProfileModal from "../../bricks/profile-modal";
import AddPatientsModal from "../../bricks/add-patientsModal";

const Menu = () => {
    const [toggleProfile, setToggleProfile] = useState(false);
    const [patientFormModal, setPatientModal] = useState(false)
    const user = useSelector(state => state.auth.user)
    const handleClose = () => {
        setPatientModal(false)
    };
    return (
        <>
            <div className="menu">
                <div className="logo">
                    <Link to="/">IQ Clinic</Link>
                    <LineIcon/>
                </div>
                <div className="menu__wrap">
                    <List>
                        {user.role === "user" && <NavLink exact className="menuNav" to="/my/records">
                            <ListItem button>
                                <ListItemIcon>
                                    <PatientsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Мои записи"/>
                            </ListItem>
                        </NavLink>}
                        {user.role === "admin" && <NavLink exact className="menuNav" to="/">
                            <ListItem button>
                                <ListItemIcon>
                                    <PatientsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Записи"/>
                            </ListItem>
                        </NavLink>}
                        {user.role === "admin" && <NavLink className="menuNav" to="/statistics">
                            <ListItem button>
                                <ListItemIcon>
                                    <StatisticIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Статистика"/>
                            </ListItem>
                        </NavLink>}
                      { user.role === "admin" && <NavLink className="menuNav" to="/users">
                            <ListItem button>
                                <ListItemIcon>
                                    <UsersIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Пациенты"/>
                            </ListItem>
                        </NavLink>}
                         <NavLink className="menuNav" to="/news">
                            <ListItem button>
                                <ListItemIcon>
                                    <NewsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Новости"/>
                            </ListItem>
                        </NavLink>
                    </List>
                    <NavLink to="/add/patients" className="menuNav">
                        <ListItem button>
                            <ListItemIcon>
                                <AddUser/>
                            </ListItemIcon>
                            <ListItemText primary="Добавить"/>
                        </ListItem>
                    </NavLink>
                </div>
                <div className="profile-menu" onClick={() => setToggleProfile(true)}>
                    <Avatar alt={user.fullName}
                            src={user.photo}
                            className="conferenceBox__avatar"
                            style={{backgroundColor: randomColor()}}>
                        {user.fullName.substr(0, 1)}
                    </Avatar>
                    <div>{user.fullName}</div>
                </div>
            </div>
            <ProfileModal open={toggleProfile} toggle={setToggleProfile} />
        </>
    );
};

export default Menu;
