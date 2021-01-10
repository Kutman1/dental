import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import RecordAPI from "../api/record/RecordAPI";
import {timeAppointment} from "../utils/timeData"
import UserAPI from "../api/users/UserAPI";
import {useHistory} from "react-router-dom";
import {successAddRecord} from "../pages/addPatients/actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Наименование записи', 'Выберите себя из списка', 'Выберите в какое время хотите записаться'];
}


function Test() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
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
            if (res.data.disabled) {
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
        fullName: user.fullName,
        phone: user.phone
    });
    const [time, setTime] = useState(timeStartDefault);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSlot({...slots, date: moment(date).format("YYYY-DD-MM")})
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (activeStep === steps.length - 1 && record.nameRecord && record.fullName && selectedDate && slots.disabled) {

            await RecordAPI.addSlots(slots);
            const data = {
                ...record,

                timeRecord: slots.disabled[0],
                dateRecord: selectedDate,
                day: new Date(selectedDate).getDate(),
                month: new Date(selectedDate).getMonth(),
                years: new Date(selectedDate).getFullYear(),
                patientsId,
            };
            try {
                const result = await RecordAPI.createRecord(data)
                if (result.data.success) {
                    history.push(user.role === "user" ? "/my/records" : '/');
                    dispatch(successAddRecord());
                    setOpen(true)
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            alert("Заполните все поля!")
        }
    };
    const getAutoComplete = (elem) => () => {
        setIdPatients(elem)
        setFind(users.find(x => x._id === elem._id))
        setRecord({...record, fullName: elem.fullName, phone: elem.phone})
    }

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChange = e => {
        setRecord({...record, [e.target.name]: e.target.value})
    }

    console.log(record)

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e) => setRecord({...record, nameRecord: e.target.value})}
                    name="nameRecord"
                    label="Наименование"
                    placeholder="Например: поставить пломбу"
                    autoFocus
                />
            case 1:
                return <>
                    {user.role === "admin" ? <Autocomplete
                        fullWidth
                        id="combo-box-demo"
                        options={users}
                        onChange={(e, e2) => {
                            setRecord({...record, fullName: e2.fullName, phone: e2.phone})
                        }}
                        noOptionsText="Не найдено..."
                        getOptionLabel={(option) => option.fullName}
                        renderOption={(option) => (
                            <div className="sortBoxOption" onClick={getAutoComplete(option)}>
                                <span>{option.fullName}</span>
                            </div>
                        )}

                        renderInput={(params) => <TextField {...params} label="Имя пациента" variant="outlined"/>}
                    /> : <TextField value={user.fullName} disabled={true}/>}
                </>;
            case 2:
                return <Box className="date-wrap" display="flex" mt="20px" mb="20px" align-items="center">
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
                    <FormControl className="slot-date">
                        <FormLabel className="selected-time">Выберите время</FormLabel>
                        <Select fullWidth noValidate className="timeAppointment" onChange={(e) => {
                            setSlot({...slots, disabled: [e.target.value]})
                        }}>
                            {timeAppointment.map((t, i) => (
                                <MenuItem disabled={getInfo[i]} type="text" value={t} key={i}>{t}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>;
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? handleClick : handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Завершить' : 'Дальше'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Все шаги выполнены</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Очистить
                    </Button>
                </Paper>
            )}
        </div>
    );
}

export default Test;
