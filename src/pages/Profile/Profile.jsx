import React, {useEffect, useState} from 'react';
import './Profile.scss';
import {useDispatch, useSelector} from "react-redux";
import {uploadPhoto} from "../authorization/actions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from '@material-ui/icons/Close';
import Avatar from "@material-ui/core/Avatar";
import {randomColor} from "../../utils/randomColor";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const request = useSelector(state => state.auth.request);
    const dispatch = useDispatch();
    const [img, setImg] = useState('');
    const [editBoolean, setEditBoolean] = useState(false);
    useEffect(() => {
        if (img) {
            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "iqclinic");
            data.append("cloud_name", "iqclinic");
            fetch("https://api.cloudinary.com/v1_1/iqclinic/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
                .then(data => {
                    dispatch(uploadPhoto(data.url))
                }).catch(err => {
                console.log("Ошибка" + err)
            });
        }
    }, [dispatch, img]);
    console.log(request)
    return (
        <div className="profile-page profile">
            <div className="profile__avatar">
                <label htmlFor="photo"  className="profile__avatar-wrap">
                    {user.photo &&
                    <div className="avatar-overlay" >
                        {request && <CircularProgress/>}
                    </div>}
                    <Avatar alt={user.fullName}
                            id="profile__avatar"
                            src={user.photo}
                            style={{backgroundColor: randomColor()}}>
                        {request ? <CircularProgress /> : user.fullName.substr(0, 1)}
                    </Avatar>
                </label>
                <input type="file" name="photo" id="photo" style={{display: "none"}} onChange={(e) => setImg(e.target.files[0])}/>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <h3 className="profile__title">{user.fullName}</h3>
                    <EditSharpIcon onClick={() => setEditBoolean(!editBoolean)}/>
                </Box>
            </div>
            <form className="boxForm" noValidate autoComplete="off">
                <FormControl fullWidth required disabled={!editBoolean}>
                    <InputLabel>ФИО</InputLabel>
                    <Input
                        value={user.fullName}
                        endAdornment={
                            <InputAdornment position="end" className="iconClear">
                                {editBoolean &&
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                                }
                            </InputAdornment>
                        }/>
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl fullWidth required disabled={!editBoolean}>
                    <InputLabel>Номер телефона</InputLabel>
                    <Input
                        value={user.phone}
                        endAdornment={
                            <InputAdornment position="end" className="iconClear">
                                {editBoolean &&
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                                }
                            </InputAdornment>
                        }/>
                    <FormHelperText></FormHelperText>
                </FormControl>
                <Box className="modalButtonGroup">
                    {editBoolean &&
                    <>
                        <Button variant="outlined" color="primary"
                        >Отмена</Button>
                        <Button variant="contained" color="primary"
                                disableElevation
                        >Сохранить</Button>
                    </>
                    }
                </Box>
            </form>
        </div>
    );
};

export default Profile;
