# 🔐 JWT Authentication - Frontend Implementation

## 📖 Огляд

Frontend частина системи JWT автентифікації для React додатку. Включає в себе модальні форми для входу/реєстрації, контекст управління станом автентифікації та HTTP клієнт для взаємодії з backend API.

## 🏗️ Архітектура

### Компоненти

- **LoginForm.jsx** - Модальна форма входу в систему
- **RegisterForm.jsx** - Модальна форма реєстрації користувача  
- **LogoutModal.jsx** - Модальне вікно підтвердження виходу
- **PrivateRoute.jsx** - Захищені маршрути для автентифікованих користувачів
- **PublicRoute.jsx** - Публічні маршрути для неавтентифікованих користувачів

### Управління станом

- **AuthContext.jsx** - React Context для глобального стану автентифікації
- **useAuthActions.js** - Custom hook для дій автентифікації (логін, реєстрація, логаут)

### HTTP клієнт

- **api.js** - Axios клієнт з interceptors для автоматичного додавання JWT токенів

## 🔧 Налаштування

### Встановлення залежностей

```bash
npm install axios react-hot-toast
```

### Змінні середовища

Створіть файл `.env` в корені проекту:

```env
VITE_API_URL=http://localhost:3001/api
```

## 🚀 Використання

### 1. Налаштування AuthProvider

Оберніть ваш додаток в `AuthProvider`:

```jsx
// main.jsx або App.jsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Ваш додаток */}
    </AuthProvider>
  );
}
```

### 2. Використання в компонентах

```jsx
import { useAuth } from '../contexts/AuthContext';
import { useAuthActions } from '../hooks/useAuthActions';

function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  const { login, register, logout } = useAuthActions();
  
  // Логіка компонента
}
```

### 3. Захищені маршрути

```jsx
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

<Routes>
  <Route path="/dashboard" element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } />
</Routes>
```

## 📡 API Взаємодія

Frontend взаємодіє з backend через наступні endpoints:

- `POST /auth/register` - Реєстрація користувача
- `POST /auth/login` - Вхід в систему
- `POST /auth/logout` - Вихід з системи
- `GET /auth/me` - Отримання поточного користувача

## 🔒 Автентифікація

JWT токен зберігається в `localStorage` та автоматично додається до всіх HTTP запитів через axios interceptors. При отриманні 401 помилки користувач автоматично перенаправляється на сторінку входу.

## 🎯 Особливості

- ✅ Модальні форми з валідацією
- ✅ Автоматичне управління JWT токенами  
- ✅ Глобальний стан автентифікації
- ✅ Захищені та публічні маршрути
- ✅ Обробка помилок з toast повідомленнями
- ✅ Автоматичне перенаправлення при logout/401

## 🔗 Зв'язок з Backend

Цей frontend працює разом з backend API (project-yummi-api), який надає:
- JWT токени
- Хешування паролів
- Валідацію користувачів
- Захищені endpoints

## 📝 Примітки розробника

- Токени зберігаються в localStorage (в production варто розглянути httpOnly cookies)
- Всі помилки API відображаються через react-hot-toast
- Стан автентифікації синхронізований між компонентами через Context API
