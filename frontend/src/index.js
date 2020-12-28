import React from 'react';
import ReactDOM from 'react-dom';
import {BreakpointProvider} from 'react-socks'
import {App} from './components/app';
import './styles/main.css';

const app = (
  <BreakpointProvider>
    <App />
  </BreakpointProvider>
);

ReactDOM.render(
  app,
  document.getElementById('app')
);