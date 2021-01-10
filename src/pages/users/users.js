import React, {useEffect, useState} from 'react';
import UserAPI from "../../api/users/UserAPI";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Paper} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import {randomColor} from "../../utils/randomColor";
import "./users.scss"
import LinearProgress from "@material-ui/core/LinearProgress";
import {useSelector} from "react-redux";
const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const photo = useSelector(state => state.auth.user.photo);
    useEffect(() => {
        let isActive = true;
        if (isActive) {
            UserAPI.getUsers().then(data => {
                setLoading(false)
                setUsers(data.data.users)
            }).catch(err => console.log(err))
        }
        return () => {
            isActive = false;
        }
    }, [photo])


    const handleEditOpen = () => {

    }


    const classes = useStyles();
    return (
        <div className="users">
            <TableContainer component={Paper} className={classes.root}>
                <Table>
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell align="left">№</TableCell>
                            <TableCell>Фамилия Имя</TableCell>
                            <TableCell align="left">Номер телефона</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {users.map((user, i) => (
                            <TableRow key={user._id}>
                                <TableCell align="left">{i + 1}</TableCell>
                                <TableCell align="left" scope="row">
                                    <Box display="flex" alignItems="center">
                                        <Avatar alt={user.fullName} src={user.photo} className={classes.small}
                                                style={{backgroundColor: randomColor()}}>
                                            {user.fullName.substr(0, 1)}
                                        </Avatar>
                                        <Box className={classes.title}
                                             onClick={() => handleEditOpen(user._id)}>{user.fullName}</Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{user.phone}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {loading && <LinearProgress />}
            </TableContainer>
        </div>
    );
};
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& a': {
                color: '#085CFF',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline'
                }
            }
        },
        head: {
            fontFamily: 'Nunito sans-serif',
            backgroundColor: '#fff',
            '& .MuiTableCell-root': {
                color: '#333',
                fontWeight: 700
            }
        },
        body: {
            '& .MuiTableRow-root:hover': {
                background: '#F1F6F8'
            }
        },
        small: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            marginRight: 20,
            fontSize: 12,
        },
        positionName: {
            color: '#333',
            textDecoration: 'underline',
            fontSize: '14px',
        },
        copyContactIcon: {
            cursor: 'pointer'
        },
        title: {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }),
);
export default Users;
