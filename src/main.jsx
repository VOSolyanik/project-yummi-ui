import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import 'modern-normalize';
import './styles/style.css';

import App from './App.jsx';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
