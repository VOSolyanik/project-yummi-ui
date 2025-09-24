import { Suspense, lazy } from 'react';

import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '@contexts/AuthContext';
import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import PublicRoute from '@components/PublicRoute/PublicRoute';

import './App.module.css';

// Lazy loading for pages
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));


const App = () => {

  return (
    <>
      <Helmet>
        <meta name="description" content="Find delicious food options for your next meal. Browse our selection of recipes, read reviews, and discover new favorites." />
      </Helmet>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Toaster position="top-right" />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Публічні маршрути */}
              <Route path="/" element={
                <Suspense fallback={<Loader />}><HomePage /></Suspense>
              } />

              {/* Приватні маршруті (доступні тільки автентифікованим користувачам) */}
              {/* Приклад: <Route path="/profile" element={
                <PrivateRoute>
                  <Suspense fallback={<Loader />}><ProfilePage /></Suspense>
                </PrivateRoute>
              } /> */}
              
              {/* 404 сторінка */}
              <Route path="*" element={
                <Suspense fallback={<Loader />}><NotFoundPage /></Suspense>
              } />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
