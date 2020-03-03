import React from 'react';
import { Container, Box, createStyles, makeStyles } from '@material-ui/core';
import { Map } from 'react-amap';
import SearchBar from '../components/SearchBar';
import { amapkey } from '../common/const';

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
    <>
      <Container className={classes.main} maxWidth="xs">
        <Box marginY={2}>
          <SearchBar />
        </Box>
      </Container>
      <Box className={classes.map}>
        <Map amapkey={amapkey} />
      </Box>
    </>
  );
};

export default App;
