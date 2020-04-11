import React from 'react';

import '../index.css';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface ItineraryInfoProps {
  peopleNum: string;
  crowdType: string;
  travelMode: string;
  dayTime: string;
  setPeopleNum: React.Dispatch<React.SetStateAction<string>>;
  setCrowdType: React.Dispatch<React.SetStateAction<string>>;
  setTravelMode: React.Dispatch<React.SetStateAction<string>>;
  setDayTime: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    appbar: {
      background: 'rgb(127, 95, 251)',
    },
    mid: {
      flexGrow: 1,
    },
    view: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      padding: 8,
      overflowY: 'scroll',
      background: '#eee',
    },
    formContainer: {
      marginTop: 40,
      marginBottom: 40,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);

const ItineraryInfo: React.FC<ItineraryInfoProps> = ({
  peopleNum,
  crowdType,
  travelMode,
  dayTime,
  setPeopleNum,
  setCrowdType,
  setTravelMode,
  setDayTime,
}) => {
  const classes = useStyles();

  const handlePeopleNumChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setPeopleNum(event.target.value as string);
  };

  const handleCrowdType = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setCrowdType(event.target.value as string);
  };

  const handleTravelMode = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setTravelMode(event.target.value as string);
  };

  const handleDayTime = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setDayTime(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.mid}>
            信息填写
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.view}>
        <Grid
          className={classes.formContainer}
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <FormControl className={classes.formControl}>
            <InputLabel id="people-number-label">人数</InputLabel>
            <Select
              labelId="people-number-label"
              id="people-number"
              value={peopleNum}
              onChange={handlePeopleNumChange}
            >
              <MenuItem value="0">不限</MenuItem>
              <MenuItem value="1">1人</MenuItem>
              <MenuItem value="2">2人</MenuItem>
              <MenuItem value="3">3~5人</MenuItem>
              <MenuItem value="4">6~10人</MenuItem>
              <MenuItem value="5">10人以上</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="crowd-type-label">人群</InputLabel>
            <Select
              labelId="crowd-type-label"
              id="crowd-type"
              value={crowdType}
              onChange={handleCrowdType}
            >
              <MenuItem value="0">不限</MenuItem>
              <MenuItem value="1">学生</MenuItem>
              <MenuItem value="2">同事</MenuItem>
              <MenuItem value="3">亲子</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="travel-mode-label">主要出行方式</InputLabel>
            <Select
              labelId="travel-mode-label"
              id="travel-mode"
              value={travelMode}
              onChange={handleTravelMode}
            >
              <MenuItem value="0">不限</MenuItem>
              <MenuItem value="1">驾车</MenuItem>
              <MenuItem value="2">公交</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="day-time-label">每日游玩时间</InputLabel>
            <Select
              labelId="day-time-label"
              id="day-time"
              value={dayTime}
              onChange={handleDayTime}
            >
              <MenuItem value="0">3小时</MenuItem>
              <MenuItem value="1">4小时</MenuItem>
              <MenuItem value="2">5小时</MenuItem>
              <MenuItem value="3">6小时</MenuItem>
              <MenuItem value="4">7小时</MenuItem>
              <MenuItem value="5">8小时</MenuItem>
              <MenuItem value="6">9小时</MenuItem>
              <MenuItem value="7">10小时</MenuItem>
              <MenuItem value="8">11小时</MenuItem>
              <MenuItem value="9">12小时</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </div>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Button color="inherit">
            <Link
              to="/itinerary/new/date"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              上一步
            </Link>
          </Button>
          <Typography className={classes.mid} />
          <Button color="inherit">
            <Link
              to="/itinerary/new/city"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              下一步
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ItineraryInfo;
