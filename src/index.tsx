import React from 'react';
import ReactDom from 'react-dom';
import { Button } from '@material-ui/core';

import './index.css';

const App: React.FC = () => {
  return (
    <div>
      <h1 className="red">Hello, world</h1>
      <Button>test</Button>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
