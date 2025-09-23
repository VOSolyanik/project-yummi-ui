import React from 'react';

import { HelmetProvider } from 'react-helmet-async';

import { createRoot } from 'react-dom/client';

import 'modern-normalize';
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </HelmetProvider>
  </React.StrictMode>,
);
