import React from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import 'modern-normalize';
import './styles/style.css';

import App from './App.jsx';
import Loader from './components/Loader/Loader.jsx';
import { store, persistor } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
