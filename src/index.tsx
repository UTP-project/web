import React from 'react';
import ReactDom from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import App from './pages/App';

ReactDom.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.querySelector('#root')
);
