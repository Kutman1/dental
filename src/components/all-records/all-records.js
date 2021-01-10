import React, {useEffect, useState} from 'react';
import RecordAPI from "../../api/record/RecordAPI";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import {randomColor} from "../../utils/randomColor";
import {CalendarIcon, TimeIcon} from "../../icons/icons";
import Moment from "react-moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSelector} from "react-redux";

const AllRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const photo = useSelector(state => state.auth.user.photo);
    useEffect(() => {
        let isActive = true;
        if (isActive) {
            RecordAPI.getRecords().then(result => {
                setRecords(result.data.records)
                setLoading(false)
            })
        }
        return () => isActive = false
    }, [photo]);
    return (
        <div className="records">
            {loading && <CircularProgress />}
            <Grid container spacing={3}>
                {records.map((record) => (
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

export default AllRecords;
