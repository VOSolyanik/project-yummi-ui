import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Початковий стан
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
};

// Типи дій
const AUTH_ACTIONS = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Редюсер для управління станом
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.AUTH_SUCCESS:
      const { user, token } = action.payload;
      if (token) {
        localStorage.setItem('token', token);
      }
      return {
        ...state,
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Створення контексту
const AuthContext = createContext();

// Провайдер контексту
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Функція для початку процесу аутентифікації
  const authStart = () => {
    dispatch({ type: AUTH_ACTIONS.AUTH_START });
  };

  // Функція для успішної аутентифікації
  const authSuccess = (userData, token) => {
    dispatch({
      type: AUTH_ACTIONS.AUTH_SUCCESS,
      payload: { user: userData, token },
    });
    toast.success('Successfully signed in!');
  };

  // Функція для помилки аутентифікації
  const authFailure = (error) => {
    dispatch({
      type: AUTH_ACTIONS.AUTH_FAILURE,
      payload: error,
    });
    toast.error(error || 'Authentication error');
  };

  // Функція для логауту
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    toast.success('Successfully signed out');
  };

  // Функція для очищення помилок
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Перевірка токену при завантаженні
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Тут можна додати запит до API для перевірки валідності токену
      // і отримання даних користувача
      console.log('Token found, should validate with API');
    }
  }, []);

  const value = {
    ...state,
    authStart,
    authSuccess,
    authFailure,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
