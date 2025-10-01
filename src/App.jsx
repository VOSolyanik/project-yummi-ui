import { Suspense, lazy } from 'react';

import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppBootstrap from '@components/AppBootstrap/AppBootstrap';
import AuthModalManager from '@components/AuthModalManager/AuthModalManager';
import Loader from '@components/Loader/Loader';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import SharedLayout from '@components/SharedLayout/SharedLayout';

import { AuthModalProvider } from '@contexts/AuthModalContext';

import './App.module.css';

const isUIKitEnabled = import.meta.env.VITE_SHOW_UI_KIT === 'true';

// Lazy loading for pages
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const UserPage = lazy(() => import('@pages/UserPage/UserPage'));
const AddRecipePage = lazy(() => import('@pages/AddRecipePage/AddRecipePage'));
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
      <AppBootstrap>
        <AuthModalProvider>
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
                  {isUIKitEnabled && (
                    <Route
                      path="/uikit"
                      element={
                        <Suspense fallback={<Loader />}>
                          <UIKitPage />
                        </Suspense>
                      }
                    />
                  )}
                  <Route
                    path="/user/:userId"
                    element={
                      <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                          <UserPage />
                        </Suspense>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/recipe/add"
                    element={
                      <PrivateRoute>
                        <Suspense fallback={<Loader />}>
                          <AddRecipePage />
                        </Suspense>
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Routes>
              <AuthModalManager />
            </Suspense>
          </BrowserRouter>
        </AuthModalProvider>
      </AppBootstrap>
    </>
  );
};

export default App;
