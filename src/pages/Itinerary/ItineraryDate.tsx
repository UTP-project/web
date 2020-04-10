import React, { useState } from 'react';
import IfiniteCalendar, { Calendar, withRange } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import zhCN from 'date-fns/locale/zh_cn';
import {
  Button,
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {} from 'react-router-dom';

import '../index.css';

const CalendarWithRange = withRange(Calendar);

const useStyles = makeStyles(() =>
  createStyles({
    appbar: {
      background: 'rgb(127, 95, 251)',
      top: 'auto',
      bottom: 0,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ItineraryDate: React.FC = () => {
  const classes = useStyles();

  const [start] = useState(new Date());
  const [end] = useState(new Date());

  return (
    <>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <Button color="inherit" href="/itinerary">
            返回
          </Button>
          <Typography className={classes.title} />
          <Button color="inherit" href="/itinerary/info">
            下一步
          </Button>
        </Toolbar>
      </AppBar>
      <IfiniteCalendar
        Component={CalendarWithRange}
        theme={{
          selectionColor: 'rgb(146, 118, 255)',
          textColor: {
            default: '#333',
            active: '#FFF',
          },
          weekdayColor: 'rgb(146, 118, 255)',
          headerColor: 'rgb(127, 95, 251)',
          floatingNav: {
            background: 'rgba(81, 67, 138, 0.96)',
            color: '#FFF',
            chevron: '#FFA726',
          },
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        selected={{
          start,
          end,
        }}
        min={new Date()}
        minDate={new Date()}
        locale={{
          locale: zhCN,
          weekdays: ['日', '一', '二', '三', '四', '五', '六'],
          todayLabel: {
            long: '今天',
          },
          headerFormat: 'MMM Do',
        }}
      />
    </>
  );
};

export default ItineraryDate;
