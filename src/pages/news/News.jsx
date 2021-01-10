import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import './News.scss';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {ButtonPlusIcon, CalendarIcon} from "../../icons/icons";
import {useHistory} from "react-router-dom";
import NewsAPI from "../../api/news/NewsAPI";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/styles";
import Moment from "react-moment";

const News = () => {
    const [search, setSearch] = useState('');
    const history = useHistory();
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let data = await NewsAPI.getNews();
            if (data.data.success) {
                setNews(data.data.news)
            }
        }
        fetchData()
    }, []);
    const classes = useStyles();

    return (
        <div className="news">

            <Grid container spacing={3} justify="space-between" alignItems="center">
                <Grid item>
                    <FormControl variant="outlined" size="small" className="search">
                        <OutlinedInput
                            placeholder="Поиск новостей"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    {search
                                        ?
                                        <IconButton edge="end" onClick={() => setSearch('')}>
                                            <CloseIcon/>
                                        </IconButton>
                                        :
                                        <IconButton edge="end" onClick={() => setSearch('')}>
                                            <SearchIcon/>
                                        </IconButton>
                                    }
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item className="small-border">
                    <Box textAlign="right">
                        <Button
                            startIcon={<ButtonPlusIcon/>}
                            variant="contained" color="primary"
                            disableElevation
                            onClick={() => history.push('/add/news')}>
                            Новый
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Box className="news-item" display="flex" flexWrap="wrap">
                    {news.map((elem, idx) => {
                        return (
                            <Card key={elem._id} className={classes.root}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <div dangerouslySetInnerHTML={{__html: elem.value}}/>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Box width={1} alignItems="center" display="flex" justifyContent="space-between">
                                        <Button size="small" color="primary">
                                            Подробнее
                                        </Button>
                                        <div className="news-time">
                                            <span className="icon"><CalendarIcon/></span>
                                            <Moment format="DD MMMM YYYY" locale="ru">{elem.created_at}</Moment>
                                        </div>
                                    </Box>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Box>
            </Grid>
        </div>
    );
};
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginLeft: 10
    }
});
export default News;
