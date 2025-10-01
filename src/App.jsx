import { Suspense, lazy } from 'react';

import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Loader from '@components/Loader/Loader';
import SharedLayout from '@components/SharedLayout/SharedLayout';

import './App.module.css';

const isUIKitEnabled = import.meta.env.VITE_SHOW_UI_KIT === 'true';

// Lazy loading for pages
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const UIKitPage = lazy(() => import('@pages/UIKitPage/UIKitPage'));

const App = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Find delicious food options for your next meal. Browse our selection of recipes, read reviews, and discover new favorites."
        />
      </Helmet>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <HomePage />
                  </Suspense>
                }
              />
              {isUIKitEnabled && <Route
                path="/uikit"
                element={
                  <Suspense fallback={<Loader />}>
                    <UIKitPage />
                  </Suspense>
                }
              />
              }
              {/* TODO: Add route for AddRecipePage when created */}
              {/* <Route path="/add" element={<AddRecipePage />} /> */}
              {/* TODO: Add route for UserPage when created */}
              {/* <Route path="/user" element={<UserPage />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
