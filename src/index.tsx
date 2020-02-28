import React from 'react';
import ReactDom from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import App from './pages/App';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BMap: any; // import baidu map api
  }
}

ReactDom.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.querySelector('#root')
);
