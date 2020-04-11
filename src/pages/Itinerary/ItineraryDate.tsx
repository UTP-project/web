import React from 'react';
import IfiniteCalendar, {
  Calendar,
  withRange,
  DateType,
} from 'react-infinite-calendar';
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
import { Link } from 'react-router-dom';

import '../index.css';

export interface ItineraryDateProps {
  start: DateType;
  end: DateType;
}

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

const ItineraryDate: React.FC<ItineraryDateProps> = ({ start, end }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <Button color="inherit">
            <Link
              to="/itinerary"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              返回
            </Link>
          </Button>
          <Typography className={classes.title} />
          <Button color="inherit">
            <Link
              to="/itinerary/new/info"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              下一步
            </Link>
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
