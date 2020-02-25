import React from 'react';
import ReactDom from 'react-dom';

import './index.css';

import Home from './pages/Home';

const App = () => {
  return <h1 className="red">Hello, world</h1>;
};

ReactDom.render(<App />, document.getElementById('root'));
