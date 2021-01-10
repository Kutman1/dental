import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import "./auth.scss";
import logo from "../../assets/logo.png";
import Box from "@material-ui/core/Box";
import PhoneInput from "react-phone-input-2";
import {useDispatch} from "react-redux";
import {authenticationAction} from "./actions";

const Auth = () => {
    const [form, setForm] = useState({
        phone: "",
        password: "",
        fullName: ""
    });

    const dispatch = useDispatch();

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(authenticationAction(form))
    };
    const authorizationBox = () => {
        return (
            <form onSubmit={handleClick}>
                <div className="phoneContent">
                    <FormControl fullWidth>
                        <InputLabel shrink>Введите ФИО</InputLabel>
                        <Input
                            value={form.fullName}
                            name="fullName"
                            onChange={handleChange}
                            type="text"/>
                        <FormHelperText style={{color: 'red'}}>{}</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel shrink>Введите номер телефона</InputLabel>
                        <PhoneInput
                            value={form.phone}
                            inputProps={{
                                required: true,
                            }}
                            country="kg"
                            onlyCountries={["kg", "kz"]}
                            onChange={phone => setForm({...form, phone})}
                            masks={{kg: '(...)-...-...'}}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel shrink>Введите пароль</InputLabel>
                        <Input
                            value={form.password}
                            name="password"
                            onChange={handleChange}
                            type="password"/>
                        <FormHelperText style={{color: 'red'}}>{}</FormHelperText>
                    </FormControl>

                    <div className="phoneContent__btn">
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            className="blue-button"
                            onClick={handleClick}
                        >Отправить</Button>
                        <div className="or">
                            <div className="line"></div>
                            <span>или</span>
                            <div className="line"></div>
                        </div>
                        <Link className="register-btn"
                              to={'/'}>
                            <Button
                                variant="outlined"
                                color="primary"
                            >Отмена</Button>
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
    return (
        <div className="authorization">
            <div className="authorization-wrapper">
                <div className="authorization__content">
                    <div className="authorization__logo">
                        <img src={logo} alt="Логотип"/>
                    </div>
                    {/* <div className="authorization__text">Современная система для совместной работы</div> */}
                    <div className="authorization__form">
                        <div className="authorization__title">Регистрация</div>
                        <Box className="authorizationRow">
                            {/* {confirm ? confirmBox : authorizationBox} */}
                            {authorizationBox}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
