import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from './redux/configureStore';

const store=configureStore();
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>

  </React.StrictMode>
);

