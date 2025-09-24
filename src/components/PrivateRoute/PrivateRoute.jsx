import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../Loader/Loader';

/**
 * Компонент для захисту приватних маршрутів
 * Перенаправляє на сторінку логіну якщо користувач не автентифікований
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Показуємо лоадер під час перевірки автентифікації
  if (isLoading) {
    return <Loader />;
  }

  // Якщо користувач не автентифікований, перенаправляємо на логін
  // Зберігаємо поточну локацію для подальшого перенаправлення після логіну
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Якщо користувач автентифікований, рендеримо дочірні компоненти
  return children;
};

export default PrivateRoute;
