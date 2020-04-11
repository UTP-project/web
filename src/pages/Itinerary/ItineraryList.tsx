import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

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
    fab: {
      position: 'absolute',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
      color: theme.palette.common.white,
      backgroundColor: deepPurple[500],
      '&:hover': {
        backgroundColor: deepPurple[600],
      },
    },
  })
);

const ItineraryList: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.mid}>
            我的行程
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.view}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: 60 }}
        >
          <Typography color="textSecondary">还没有行程哦</Typography>
        </Grid>
        <Link
          to="/itinerary/new"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Fab className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default ItineraryList;
