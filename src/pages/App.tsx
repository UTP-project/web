import React from 'react';
import { Container, Box, createStyles, makeStyles } from '@material-ui/core';
import { Map } from 'react-amap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { AMAP_KEY_WEB } from '../common/const';

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      position: 'fixed',
      left: 0,
      zIndex: 99,
    },
    map: {
      width: '100vw',
      height: '100vh',
      zIndex: 0,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/itinerary" />
        </Route>
        <Route exact path="/itinerary">
          <div>my itinerary</div>
        </Route>
        <Route exact path="/itinerary/new">
          <Redirect to="/itinerary/new/date" />
        </Route>
        <Route exact path="/itinerary/new/date">
          <div>select date</div>
        </Route>
        <Route exact path="/itinerary/new/info">
          <div>select info</div>
        </Route>
        <Route exact path="/itinerary/new/city">
          <div>select cities</div>
        </Route>
        <Route exact path="/itinerary/new/viewpoint">
          <div>select viewpoints</div>
        </Route>
        <Route exact path="/map">
          <Container className={classes.main} maxWidth="xs">
            <Box marginY={2}>
              <SearchBar />
            </Box>
          </Container>
          <Box className={classes.map}>
            <Map amapkey={AMAP_KEY_WEB} />
          </Box>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
