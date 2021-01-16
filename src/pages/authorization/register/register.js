import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";
import "../auth.scss";
import logo from "../../../assets/logo.png";
import Box from "@material-ui/core/Box";
import PhoneInput from "react-phone-input-2";
import {useDispatch} from "react-redux";
import {loginUser} from "../actions";

const Register = () => {
    const history = useHistory();
    const [form, setForm] = useState({
        phone: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(loginUser(form))
        history.push('/')
    };
    const authorizationBox = () => {
        return (
            <div className="desktop-auth">
                <form onSubmit={handleClick}>
                    <div className="phoneContent">
                        <FormControl fullWidth>
                            <InputLabel shrink>Введите номер телефона</InputLabel>
                            <PhoneInput
                                value={form.phone}
                                inputProps={{
                                    required: true,
                                    autoFocus: true
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
                            >Войти</Button>
                            <div className="or">
                                <div className="line"></div>
                                <span>или</span>
                                <div className="line"></div>
                            </div>
                            <Link className="register-btn"
                                  to={'/register'}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                >Зарегистрироваться</Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="authorization">
            <div className="authorization-wrapper">
                <div className="authorization__content">
                    <div className="authorization__logo">
                       Dr.Zarip
                    </div>
                    {/* <div className="authorization__text">Современная система для совместной работы</div> */}
                    <div className="authorization__form">
                        <div className="authorization__title">Войти в систему</div>
                        <Box className="authorizationRow">
                            {/* {confirm ? confirmBox : authorizationBox} */}
                            {authorizationBox}
                        </Box>
                    </div>
                </div>
                <div className="mobile-auth">
                   <div className="mobile-auth__wrapper">
                       <div className="mobile-auth__title">Вход</div>
                       <FormControl fullWidth>
                           <InputLabel shrink>Введите номер телефона</InputLabel>
                           <PhoneInput
                               value={form.phone}
                               inputProps={{
                                   required: true,
                                   autoFocus: true
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
                       <div className="mobile-auth__btn">
                           <Button
                               variant="contained"
                               color="primary"
                               disableElevation
                               className="blue-button"
                               onClick={handleClick}
                               disabled={form.password > 2 && form.phone > 3 ? false : true}
                           >Войти</Button>
                           <div className="or">
                               <div className="line"></div>
                               <span>или</span>
                               <div className="line"></div>
                           </div>
                           <Link className="register-btn"
                                 to={'/register'}>
                               <Button
                                   variant="outlined"
                                   color="primary"
                               >Зарегистрироваться</Button>
                           </Link>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
