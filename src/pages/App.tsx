import React from 'react';
import { Container, Box } from '@material-ui/core';
import MulitiInput from '../components/MultiInput';

const App: React.FC = () => {
  return (
    <Container>
      <Box marginY={2}>
        <MulitiInput />
      </Box>
    </Container>
  );
};

export default App;
