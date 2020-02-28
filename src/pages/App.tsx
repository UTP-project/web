import React from 'react';
import { Container, Box, createStyles, makeStyles } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import YMap from '../components/YMap';

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      position: 'fixed',
      left: 0,
      zIndex: 99,
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
      <Box zIndex="0">
        <YMap />
      </Box>
    </>
  );
};

export default App;
