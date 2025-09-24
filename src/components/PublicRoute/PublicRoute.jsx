import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Компонент для публічних маршрутів (логін, реєстрація)
 * Перенаправляє автентифікованих користувачів на головну сторінку
 */
const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Якщо маршрут обмежений (restricted) і користувач автентифікований
  if (restricted && isAuthenticated) {
    // Перенаправляємо на сторінку, з якої прийшов користувач, або на головну
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
