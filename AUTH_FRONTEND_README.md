# 🔐 JWT Authentication - Frontend Implementation

## 📖 Overview

Frontend part of the JWT authentication system for React application. Uses Redux Toolkit for state management with Redux-persist for token persistence, modal-based authentication forms, and Axios interceptors for API communication.

## 🏗️ Architecture

### Components

- **Modal.jsx** - Universal modal component wrapper
- **SignInModal.jsx** - Sign-in modal window with SignInForm
- **SignUpModal.jsx** - Sign-up modal window with SignUpForm
- **SignInForm.jsx** - Sign-in form (without modal wrapper)
- **SignUpForm.jsx** - User registration form (without modal wrapper)
- **LogoutModal.jsx** - Logout confirmation modal window
- **PrivateRoute.jsx** - Protected routes for authenticated users
- **PublicRoute.jsx** - Public routes for unauthenticated users
- **AuthModalManager.jsx** - Central modal management component
- **AppBootstrap.jsx** - Application initialization and token validation

### State Management

- **Redux Toolkit** - State management with createSlice and createAsyncThunk
- **authSlice.js** - Authentication state slice with async thunks
- **routerSlice.js** - Router state management for navigation tracking
- **Redux-persist** - Automatic token persistence (only token, not user data)
- **useAuth.js** - Custom hook for authentication operations
- **AuthModalContext.jsx** - Context for modal state management

### HTTP Client

- **api.js** - Axios client with interceptors for automatic JWT token addition
- **authApi.js** - Authentication-specific API endpoints
- **storeUtils.js** - Store utilities for axios interceptors

## 🔧 Setup

### Installing Dependencies

```bash
npm install @reduxjs/toolkit react-redux redux-persist axios react-hot-toast formik yup react-router-dom
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Usage

### 1. Redux Store Setup

The application uses Redux with Redux-persist for state management:

```jsx
// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import App from './App.jsx';
import Loader from './components/Loader/Loader.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

### 2. Application Bootstrap

The app uses AppBootstrap for initialization and AuthModalProvider for modal management:

```jsx
// App.jsx
import AppBootstrap from '@components/AppBootstrap/AppBootstrap';
import AuthModalManager from '@components/AuthModalManager/AuthModalManager';
import { AuthModalProvider } from '@contexts/AuthModalContext';

function App() {
  return (
    <AppBootstrap>
      <AuthModalProvider>
        <BrowserRouter>
          {/* Your routes */}
          <AuthModalManager />
        </BrowserRouter>
      </AuthModalProvider>
    </AppBootstrap>
  );
}
```

### 3. Using Authentication in Components

```jsx
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useAuthModal';

function MyComponent() {
  const { isAuthenticated, user, login, register, logout, isLoading } = useAuth();
  const { openSignInModal, openSignUpModal, openLogoutModal } = useAuthModal();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.type.endsWith('/fulfilled')) {
      // Login successful
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={() => openLogoutModal()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => openSignInModal()}>Sign In</button>
          <button onClick={() => openSignUpModal()}>Sign Up</button>
        </div>
      )}
    </div>
  );
}
```

### 4. Modal Management

The application uses a centralized modal management system:

```jsx
// Modal types are defined in constants/modalTypes.js
export const MODAL_TYPES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  LOGOUT: 'LOGOUT'
};

// AuthModalManager automatically renders the appropriate modal
// based on currentModal state from AuthModalContext
```

### 5. Protected Routes

```jsx
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

<Routes>
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>;
```

## 📡 API Integration

Frontend interacts with backend through the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - Sign in
- `POST /auth/logout` - Sign out
- `GET /users/me` - Get current user

## 🔒 Authentication Flow

1. **Token Persistence**: Only JWT token is persisted using Redux-persist (not user data)
2. **Application Bootstrap**: AppBootstrap validates existing token on app load
3. **Automatic Token Injection**: Axios interceptors add token to all requests
4. **Token Validation**: Security utils validate token expiration before API calls
5. **Error Handling**: 401/403 responses trigger automatic logout
6. **Modal-based Auth**: Authentication forms open in modals, keeping user on current page

### Redux State Structure

```javascript
{
  auth: {
    user: null | UserObject,
    token: null | string,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: null | string
  },
  router: {
    currentPath: string,
    previousPath: string,
    pendingPrivateRoute: null | string,
    isNavigating: boolean
  }
}
```

## 🎯 Features

- ✅ **Redux Toolkit State Management** - Modern Redux with createSlice and createAsyncThunk
- ✅ **Redux-persist Integration** - Automatic token persistence across sessions
- ✅ **Centralized Modal System** - AuthModalContext and AuthModalManager for modal state
- ✅ **Route State Tracking** - Router slice for navigation state management
- ✅ **Modal-based Authentication** - Users stay on current page during auth flows
- ✅ **Form Validation** - Formik + Yup validation for all forms
- ✅ **Password Visibility Toggle** - Enhanced UX for password fields
- ✅ **Automatic JWT Management** - Token injection via Axios interceptors
- ✅ **Token Security Validation** - Client-side token expiration checks
- ✅ **Protected Route System** - PrivateRoute component with modal integration
- ✅ **Error Handling** - Toast notifications for all authentication events
- ✅ **Automatic Logout** - 401/403 response handling with state cleanup
- ✅ **CSS Variables** - Consistent design system
- ✅ **Mobile-responsive Design** - Optimized for all device sizes
- ✅ **Application Bootstrap** - Automatic token validation on app startup

## 🔗 Backend Integration

This frontend works together with backend API, which provides:

- JWT tokens with expiration handling
- Password hashing and validation
- User registration and authentication
- Protected API endpoints
- Proper HTTP status codes (401/403) for authentication errors

## 📝 Developer Notes

### Token Management

- **Storage**: Tokens are persisted via Redux-persist (automatic localStorage handling)
- **Security**: Client-side token expiration validation before API calls
- **Cleanup**: Automatic token removal on logout or authentication errors
- **API Integration**: Tokens automatically injected into all HTTP requests

### Modal System

- **Centralized**: Single AuthModalManager handles all authentication modals
- **Context-based**: AuthModalContext provides modal state across components
- **Type-safe**: Modal types defined in constants for consistency

### State Architecture

- **Redux Toolkit**: Modern Redux patterns with reduced boilerplate
- **Persistence**: Only token persisted, user data fetched fresh on app load
- **Route Tracking**: Separate router slice for navigation state management
- **Error Handling**: Comprehensive error states with user-friendly messages

### Production Considerations

- Consider httpOnly cookies for enhanced security
- Implement refresh token rotation
- Add request/response logging for debugging
- Configure proper CORS policies
- Implement rate limiting protection
