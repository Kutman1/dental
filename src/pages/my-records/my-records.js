import React, {useEffect, useState} from 'react';
import RecordAPI from "../../api/record/RecordAPI";
import {useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {randomColor} from "../../utils/randomColor";
import {CalendarIcon, TimeIcon} from "../../icons/icons";
import Moment from "react-moment";

const MyRecords = () => {
    const [records, setRecords] = useState([]);
    const success = useSelector(state => state.record.success);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        RecordAPI.getMyRecords().then(data => {
            setRecords(data.data.records)
            setLoading(false)
        }).catch((err => console.log(err)))
    }, [success]);
    console.log(records)
    return (
        <div className="records">
            <h2>Мои записи</h2>
            {loading && <CircularProgress/>}
            {!records.length && <div className="empty-records">У вас пока еще нет записей</div>}
            <Grid container spacing={3}>
                {records.map((record, idx) => (
                    <Grid item key={record._id} xs={12} sm={'auto'}>
                        <Box className="conferenceBox">
                            <div>
                                <div className="conferenceBox__title">{record.nameRecord}</div>
                                <div className="conferenceBox__info">
                                    <Avatar alt={record.postedBy.fullName}
                                            className="conferenceBox__avatar"
                                            style={{backgroundColor: randomColor()}}>
                                        {record.postedBy.fullName.substr(0, 1)}
                                    </Avatar>
                                    <Box>
                                        <Box>{record.postedBy.fullName}</Box>
                                        <Box display="flex" className="record-phone">
                                            <span>Телефон:</span>
                                            {record.phone}
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

export default MyRecords;
