import React, {useEffect, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Box from "@material-ui/core/Box";
import RecordAPI from "../../api/record/RecordAPI";
import {useHistory} from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {successAddRecord} from "./actions";
import {useDispatch, useSelector} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import UserAPI from "../../api/users/UserAPI";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Appointment from "appointment-picker";
import 'appointment-picker/dist/appointment-picker.css';
import moment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let timeAppointment = []

const AddPatients = ({handleClose}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [users, setUsers] = useState([]);
    const [patientsId, setIdPatients] = useState(null);
    const [findUser, setFind] = useState(null);
    const [slots, setSlot] = useState({
        date: moment(new Date()).format("YYYY-DD-MM"),
        disabled: null
    });
    const [getInfo, setInfo] = useState([])
    useEffect(() => {
        RecordAPI.getInfoSlots(slots.date).then(res => {
            if(res.data.disabled) {
               return setInfo(timeAppointment.map((elem => res.data.disabled.includes(elem))))
            }
            setInfo([])
        })
    }, [slots.date, selectedDate]);
    useEffect(() => {
        let isActive = true;
        if (isActive) {
            UserAPI.getUsers().then(data => {
                setUsers(data.data.users)
            }).catch(err => console.log(err))
        }
        return () => {
            isActive = false;
        }
    }, [])
    useEffect(() => {
        if (patientsId) {
            let user = users.find(item => item._id === patientsId._id)
            setFind(user)
        }
    }, [users, patientsId, findUser])
    const history = useHistory();
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    const timeStartDefault = `${hours}:${minutes}`;
    const dispatch = useDispatch();
    const [record, setRecord] = useState({
        nameRecord: '',
        fullName: '',
        phone: ''
    });
    const handleChange = e => {
        setRecord({...record, [e.target.name]: e.target.value})
    }
    const [time, setTime] = useState(timeStartDefault);

    console.log(getInfo)
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSlot({...slots, date: moment(date).format("YYYY-DD-MM")})
    };

    const handleClick = async (e) => {
        e.preventDefault();
        await RecordAPI.addSlots(slots);
        const data = {
            ...record,
            timeRecord: time,
            dateRecord: selectedDate,
            day: new Date(selectedDate).getDate(),
            month: new Date(selectedDate).getMonth(),
            years: new Date(selectedDate).getFullYear(),
            patientsId,
        };
        try {
            const result = await RecordAPI.createRecord(data)
            if (result.data.success) {
                history.push(user.role === "user" ? "/my/records" : '/')
                handleClose()
                dispatch(successAddRecord());
                setOpen(true)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const getAutoComplete = (elem) => () => {
        setIdPatients(elem)
        setFind(users.find(x => x._id === elem._id))
        setRecord({...record, fullName: elem.fullName, phone: elem.phone})
    }
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Добавить пациента
                    </Typography>
                    <form className={classes.form} onSubmit={handleClick} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="nameRecord"
                            onChange={handleChange}
                            label="Наименование"
                            placeholder="Например: поставить пломбу"
                            autoFocus
                        />
                        {user.role === "admin" && <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            onChange={(e, e2) => {
                                console.log(e)
                                console.log(e2)
                            }}
                            options={users}
                            noOptionsText="Не найдено..."
                            getOptionLabel={(option) => option.fullName}
                            renderOption={(option) => (
                                <div className="sortBoxOption" onClick={getAutoComplete(option)}>
                                    <span>{option.fullName}</span>
                                </div>
                            )}

                            renderInput={(params) => <TextField {...params} label="Имя пациента" variant="outlined"/>}
                        />}
                        <Box mt="20px">
                            <InputLabel>Номер телефона</InputLabel>
                            <Input
                                margin="normal"
                                required
                                fullWidth
                                value={record.phone ? record.phone : findUser && findUser.phone}
                                name="phone"
                                onChange={handleChange}
                                type="phone"
                                disabled={!patientsId}
                            />
                        </Box>
                        <Box display="flex" mt="20px" mb="20px" align-items="center">
                            <Grid item xs={6}>
                                <KeyboardDatePicker
                                    label="Дата назначения"
                                    format="dd.MM.yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    InputAdornmentProps={{position: "start"}}
                                    className="dateControl"
                                />
                            </Grid>
                            <Select fullWidth noValidate className="timeAppointment" onChange={(e) => {
                                setSlot({...slots, disabled: [e.target.value]})
                            }}>
                                {timeAppointment.map((t, i) => (
                                    <MenuItem disabled={getInfo[i]} type="text" value={t} key={i}>{t}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Добавить
                        </Button>
                        <Box className="modalButtonGroup">
                            <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>Закрыть</Button>
                        </Box>

                    </form>
                </div>
            </Grid>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={6000}>
                <Alert severity="success">
                    Запись создана!!!
                </Alert>
            </Snackbar>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default AddPatients;
