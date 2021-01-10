import React, {useEffect, useState} from 'react';
import "./records.scss";
import Grid from "@material-ui/core/Grid";
import RecordAPI from "../../api/record/RecordAPI";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Moment from 'react-moment';
import 'moment/locale/ru';
import {CalendarIcon, TimeIcon} from "../../icons/icons";
import {randomColor} from "../../utils/randomColor";
import {useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from "react-router-dom";
const Records = () => {
    const [records, setRecords] = useState([]);
    const success = useSelector(state => state.record.success);
    const user = useSelector(state => state.auth.user);
    const photo = useSelector(state => state.auth.user.photo);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        let isActive = true;
        if (isActive) {
            RecordAPI.getRecords().then(result => {
                setLoading(false)
                setRecords(result.data.records)
            })
        }
        return () => isActive = false
    }, [success, photo]);
    useEffect(() => {
        if (user.role !== "admin") {
            history.push('/my/records')
        }
    }, [history, user.role])
    const filterRecord = records.filter(rc => rc.month === new Date().getMonth() && rc.day === new Date().getDate() && rc.years === new Date().getFullYear());
    console.log(filterRecord)
    return (
        <div className="records">
            <h2>Записи на сегодняшний день</h2>
            {loading && <CircularProgress/>}
            <Grid container spacing={3}>
                {filterRecord.map((record, idx) => (
                    <Grid item key={record._id} xs={12} sm={'auto'}>
                        <Box className="conferenceBox">
                            <div>
                                <div className="conferenceBox__title">{record.nameRecord}</div>
                                <div className="conferenceBox__info">
                                    <Avatar alt={record.postedBy.fullName}
                                            src={record.postedBy.photo}
                                            className="conferenceBox__avatar"
                                            style={{backgroundColor: randomColor()}}>
                                        {record.postedBy.fullName.substr(0, 1)}
                                    </Avatar>
                                    <Box>
                                        <Box>{record.postedBy.fullName}</Box>
                                        <Box display="flex" className="record-phone">
                                            <span>Телефон:</span>
                                            {record.postedBy.phone}
                                        </Box>
                                    </Box>
                                </div>
                                <div className="conferenceBox__bottom">
                                    <div className="bottomItem">
                                        <span className="icon"><CalendarIcon/></span>
                                        <Moment format="DD MMMM YYYY" locale="ru">{record.dateRecord}</Moment>
                                    </div>
                                    <div className="bottomItem">
                                        <span className="icon"><TimeIcon/></span>
                                        {record.timeRecord}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Records;
