import { Suspense, lazy } from 'react';

import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from '@components/Header/Header';
import Loader from '@components/Loader/Loader';

import './App.module.css';

// Lazy loading for pages
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const UserProfilePage = lazy(() => import('@pages/UserProfilePage/UserProfilePage'));


const App = () => {

  return (
    <>
      <Helmet>
        <meta name="description" content="Find delicious food options for your next meal. Browse our selection of recipes, read reviews, and discover new favorites." />
      </Helmet>
      <BrowserRouter>
        <Header />
        <Toaster position="top-right" />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<Loader />}><HomePage /></Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<Loader />}><UserProfilePage /></Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<Loader />}><NotFoundPage /></Suspense>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
