# Yummi UI - Recipe Sharing Platform

A comprehensive React frontend application for the Yummi recipe sharing platform. Built with React 18, Vite, Redux Toolkit, and modern development tools, providing users with a complete social recipe management experience. Features include user authentication, recipe discovery, social following, and advanced filtering capabilities.

## 🚀 Features

### Core Functionality

- **Recipe Management**: Browse, search, filter, and discover recipes by categories, ingredients, and areas
- **User Authentication**: Complete signup/signin system with persistent sessions
- **Recipe Creation**: Advanced form with image upload, ingredient management, and step-by-step instructions
- **Social Features**: Follow/unfollow users, manage favorites, view user profiles
- **Advanced Search**: Filter recipes by ingredients, cooking areas, and categories
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Real-time Updates**: Dynamic content updates without page refreshes

### Technical Features

- **React 18** with modern hooks and concurrent features
- **Redux Toolkit** for predictable state management with Redux Persist
- **React Router v7** with lazy loading and private routes
- **Form Management** with Formik and comprehensive Yup validation
- **Authentication System** with JWT tokens and automatic session management
- **Image Upload** with preview and optimization
- **Toast Notifications** with react-hot-toast
- **SVG Icon System** with automated sprite generation
- **Modern CSS** with CSS Modules and responsive breakpoints
- **Path Aliases** for clean imports
- **Code Quality** tools (ESLint, Prettier, Husky)
- **SEO Optimization** with React Helmet Async
- **Performance Optimization** with code splitting and lazy loading
- **Custom Hooks** for reusable logic (useAuth, useViewport, useScrollToTop, etc.)

## 🏗️ Project Structure

```text
project-yummi-ui/
├── src/
│   ├── App.jsx              # Main App component with routing and error boundaries
│   ├── main.jsx            # Application entry point with providers
│   ├── assets/             # Static assets (images, icons, fonts)
│   │   ├── fonts/          # Custom fonts (Mulish Variable)
│   │   ├── icons/          # SVG icons for sprite generation
│   │   └── images/         # Application images and placeholders
│   ├── components/         # 30+ reusable UI components
│   │   ├── AddRecipeForm/  # Complex recipe creation form
│   │   ├── Header/         # App header with navigation
│   │   ├── Modal/          # Universal modal system
│   │   ├── RecipeCard/     # Universal recipe display component
│   │   ├── UserInfoCard/   # User profile information
│   │   ├── Testimonials/   # Customer testimonials slider
│   │   └── ...             # Many more specialized components
│   ├── pages/              # 8 main application pages
│   │   ├── HomePage/       # Landing page with categories and recipes
│   │   ├── RecipePage/     # Individual recipe details
│   │   ├── AddRecipePage/  # Recipe creation page
│   │   ├── UserPage/       # User profiles with tabs
│   │   └── ...             # Additional pages
│   ├── redux/              # State management
│   │   ├── store.js        # Redux store configuration
│   │   ├── auth/           # Authentication state
│   │   ├── recipes/        # Recipe data management
│   │   ├── categories/     # Categories and filters
│   │   ├── users/          # User data and social features
│   │   └── ...             # Additional slices
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Authentication logic
│   │   ├── useViewport.js  # Responsive breakpoint detection
│   │   ├── useScrollToTop.js # Smooth scrolling utility
│   │   └── ...             # Additional hooks
│   ├── contexts/           # React contexts
│   │   ├── AuthModalContext.jsx  # Modal state management
│   │   └── ViewportContext.jsx   # Viewport size tracking
│   ├── services/           # API services and utilities
│   │   ├── api.js          # Main API configuration
│   │   ├── authApi.js      # Authentication endpoints
│   │   ├── recipesApi.js   # Recipe CRUD operations
│   │   └── ...             # Additional API services
│   ├── schemas/            # Form validation schemas
│   ├── constants/          # Application constants
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles and CSS utilities
├── public/                 # Static files and generated SVG sprite
├── create-svg-sprite.js    # SVG sprite generation script
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite configuration with path aliases
├── jsconfig.json           # JavaScript project configuration
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

### Architecture Principles

- **Component-Based**: Modular, reusable components with single responsibility
- **State Management**: Centralized Redux store with feature-based slices
- **Custom Hooks**: Reusable logic extraction for common patterns
- **Path Aliases**: Clean imports using `@` prefixed aliases
- **CSS Modules**: Scoped styling to prevent conflicts
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Error Boundaries**: Graceful error handling and user feedback

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** package manager
- **Modern Browser** with ES6+ support

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-yummi-ui
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
# Development mode with hot reload
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Create production build
npm run build
# or
yarn build

# Preview production build locally
npm run preview
# or
yarn preview
```

## 📋 Available Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build for production (includes SVG sprite generation)
npm run preview     # Preview production build locally
npm run lint        # Run ESLint for code quality checks
npm run lint:fix    # Fix ESLint issues automatically
npm run format      # Check code formatting with Prettier
npm run format:fix  # Fix code formatting automatically
npm run svg         # Generate SVG sprite from icons
npm run prepare     # Setup Husky git hooks
```

## 🎨 Styling Architecture

### CSS Organization

- **CSS Modules**: Component-scoped styles (`.module.css`)
- **Global Styles**: Application-wide styles in `src/styles/`
- **Responsive Design**: Mobile-first with breakpoints (375px, 768px, 1440px)
- **CSS Custom Properties**: Design tokens for consistent theming
- **Modern CSS**: Flexbox, Grid, and CSS logical properties

### Design System

The application uses a comprehensive design system with:

```css
/* Responsive Breakpoints */
/* Mobile: 320px-374px (flexible), 375px (adaptive) */
/* Tablet: 768px */
/* Desktop: 1440px */

/* Color Palette */
--color-primary: #ff6b35;
--color-secondary: #004643;
--color-accent: #f9bc60;
--color-neutral: #abd1c6;
--color-background: #fffffe;
--color-text: #004643;

/* Typography */
--font-family-primary: 'Mulish', sans-serif;
--font-size-base: 1rem;

/* Spacing & Layout */
--spacing-unit: 0.5rem;
--border-radius: 0.5rem;
```

### Component Styling Guidelines

- Use CSS Modules for component-specific styles
- Follow BEM methodology for class naming within modules
- Use CSS Custom Properties for consistent theming
- Implement mobile-first responsive design
- Use `clsx` for conditional class names
- Optimize for performance with scoped styles

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

```javascript
// Instead of relative imports
import Button from '../../../components/Button/Button';

// Use alias imports
import Button from '@components/Button/Button';
```

Available aliases:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@assets/` → `src/assets/`
- `@constants/` → `src/constants/`
- `@utils/` → `src/utils/`
- `@hooks/` → `src/hooks/`
- `@redux/` → `src/redux/`
- `@contexts/` → `src/contexts/`
- `@services/` → `src/services/`
- `@schemas/` → `src/schemas/`

### Redux State Management

The application uses Redux Toolkit with the following structure:

```javascript
// Store Configuration
store/
├── store.js              # Store setup with Redux Persist
├── storeUtils.js         # Store utilities for interceptors
├── auth/                 # Authentication state
│   └── authSlice.js      # User auth, login, register, logout
├── categories/           # Categories and filters
│   └── categoriesSlice.js # Category selection and management
├── recipes/              # Recipe management
│   └── recipesSlice.js   # Recipe CRUD, search, pagination
├── users/                # User profiles and social features
│   └── usersSlice.js     # User data, following, followers
├── filters/              # Search and filter state
│   └── filtersSlice.js   # Ingredient, area, category filters
└── router/               # Route tracking
    └── routerSlice.js    # Navigation state management
```

### Custom Hooks

The application includes several custom hooks for reusable logic:

```javascript
// Available Custom Hooks
useAuth.js          # Authentication state and methods
useAuthModal.js     # Modal state management
useViewport.js      # Responsive breakpoint detection
useRouteTracker.js  # Route change tracking
useScrollToTop.js   # Smooth scrolling utility
useDebounce.js      # Value debouncing for performance
```

### ESLint Configuration

The project includes comprehensive ESLint rules for:

- **React Best Practices**: Hooks rules, component patterns
- **Code Quality**: Unused variables, consistent formatting
- **Import Organization**: Path resolution, import order
- **Accessibility**: JSX accessibility rules
- **Modern JavaScript**: ES2020+ features support

### Code Quality Tools

- **ESLint**: Linting with React, hooks, and accessibility rules
- **Prettier**: Code formatting with consistent style
- **Husky**: Git hooks for pre-commit quality checks
- **lint-staged**: Run linters on staged files only

## 🚀 Development Workflow

### Component Development

1. **Create Component Directory**: `src/components/ComponentName/`
2. **Component File**: `ComponentName.jsx`
3. **Styles**: `ComponentName.module.css`
4. **Export**: Add to component index if needed

Example component structure:

```jsx
// Button/Button.jsx
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './Button.module.css';

const Button = forwardRef(({
  variant = 'primary',
  size = 'medium',
  as: Component = 'button',
  children,
  className,
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={clsx(css.button, css[variant], css[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';
export default Button;
```

### Page Development

1. **Create Page Directory**: `src/pages/PageName/`
2. **Page Component**: Handle routing, data fetching, and layout
3. **Use Lazy Loading**: Wrap with `lazy()` for code splitting
4. **SEO Optimization**: Add Helmet for meta tags
5. **Private Routes**: Use PrivateRoute wrapper for authenticated pages

### Adding New Features

1. **Redux Slice**: Create state management for new features
2. **API Services**: Add backend integration in services folder
3. **Components**: Create reusable UI components
4. **Pages**: Implement page-level logic and layouts
5. **Routing**: Update routing in `App.jsx`
6. **Constants**: Define application constants
7. **Validation**: Add Yup schemas for forms

### Form Development with Formik

```jsx
// Example form implementation
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required')
});

const MyForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <Field name="email" type="email" />
      <ErrorMessage name="email" component="div" />
      <Field name="password" type="password" />
      <ErrorMessage name="password" component="div" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);
```

## 📦 Deployment

### Vercel Deployment (Recommended)

The project is optimized for Vercel deployment with SPA routing support.

#### Automatic Deployment

1. **Connect Repository**: Link your Git repository to Vercel
2. **Auto Deploy**: Vercel automatically deploys on push to main branch
3. **Preview Builds**: Get preview URLs for pull requests

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

#### Vercel Configuration

The `vercel.json` file configures SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Other Deployment Platforms

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Redirect rules (add to _redirects file in public/)
/*    /index.html   200
```

#### GitHub Pages

```bash
# Build for GitHub Pages
npm run build

# Deploy dist/ folder to gh-pages branch
```

## 🧪 Testing (Future Implementation)

The project structure is prepared for testing implementation:

### Recommended Testing Stack

- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for integration tests
- **Playwright**: End-to-end testing

### Testing Structure (Planned)

```text
src/
├── components/
│   └── Button/
│       ├── Button.jsx
│       ├── Button.module.css
│       └── Button.test.jsx
├── pages/
│   └── HomePage/
│       ├── HomePage.jsx
│       └── HomePage.test.jsx
└── __tests__/
    ├── setup.js
    └── utils.js
```

## 🔌 API Integration

### Service Layer Architecture

The application uses a service layer pattern for API integration:

```javascript
// services/api.js - Main API configuration
import axios from 'axios';
import { getAuthToken, dispatchLogout } from '../redux/storeUtils';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      dispatchLogout();
    }
    return Promise.reject(error);
  }
);
```

### API Services

The application includes specialized API services:

```javascript
// Available API Services
authApi.js      # Authentication (login, register, logout, refresh)
recipesApi.js   # Recipe CRUD operations and search
categoriesApi.js # Categories and filtering data
usersApi.js     # User profiles and social features
favoritesApi.js # Favorites management
socialApi.js    # Follow/unfollow functionality
```

### Environment Variables

Create `.env.local` for local development:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Application Settings
VITE_SHOW_UI_KIT=false

# Optional Settings
VITE_APP_TITLE=Yummi - Recipe Sharing Platform
VITE_ENABLE_REDUX_DEVTOOLS=true
```

## 🎯 Performance Optimization

### Current Optimizations

- **Code Splitting**: Lazy loading for pages and heavy components
- **Tree Shaking**: Automatic dead code elimination with Vite
- **Asset Optimization**: SVG sprites, image compression, and modern formats
- **Modern Bundle**: ES modules for modern browsers with fallbacks
- **CSS Optimization**: Scoped styles with CSS Modules
- **Redux Optimization**: Normalized state, selective re-renders
- **Scroll Optimization**: Custom useScrollToTop hook for smooth navigation
- **Debouncing**: Custom useDebounce hook for search and filters
- **Memory Management**: Proper cleanup in useEffect hooks
- **Bundle Analysis**: Vite bundle analyzer for optimization insights

### Performance Best Practices Implemented

- Route-based code splitting with React.lazy()
- Redux state normalization and selective subscriptions
- Memoization with React.memo() for expensive components
- Optimized re-renders with useCallback and useMemo
- Image optimization with WebP and proper loading strategies
- Service worker ready for caching strategies
- Efficient form validation with Formik and Yup

### Bundle Optimization

```javascript
// vite.config.js optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          forms: ['formik', 'yup'],
        },
      },
    },
  },
});
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Change port in vite.config.js or use different port
   npm run dev -- --port 3001
   ```

2. **Module Resolution Errors**
   - Verify path aliases in `vite.config.js` and `jsconfig.json`
   - Check file extensions (use `.jsx` for React components)
   - Ensure consistent import/export syntax

3. **Build Errors**
   - Check for unused imports and variables
   - Verify all dependencies are installed
   - Run `npm run lint` to catch issues early

4. **Styling Issues**
   - Verify CSS Module class names (use `css.className`)
   - Check CSS Custom Properties syntax
   - Ensure proper import of CSS files

## 📚 Dependencies Overview

### Core Dependencies

- **react**: ^18.3.1 - UI library with hooks and concurrent features
- **react-dom**: ^18.3.1 - DOM rendering for React
- **react-router-dom**: ^7.9.1 - Client-side routing with data loading
- **@reduxjs/toolkit**: ^2.9.0 - Modern Redux with RTK Query
- **react-redux**: ^9.2.0 - React bindings for Redux
- **redux-persist**: ^6.0.0 - Persist Redux state to localStorage
- **formik**: ^2.4.6 - Form state management and validation
- **yup**: ^1.7.1 - Schema validation for forms
- **axios**: ^1.12.2 - HTTP client with interceptors
- **react-hot-toast**: ^2.6.0 - Toast notification system
- **react-helmet-async**: ^2.0.5 - SEO and document head management
- **react-spinners**: ^0.17.0 - Loading spinner components
- **clsx**: ^2.1.1 - Conditional class name utility
- **modern-normalize**: ^3.0.1 - CSS normalization
- **swiper**: ^10.1.0 - Touch slider component

### Development Dependencies

- **vite**: ^7.1.7 - Build tool and dev server
- **@vitejs/plugin-react**: ^5.0.3 - React support for Vite
- **eslint**: ^9.36.0 - Code linting with React rules
- **eslint-plugin-react**: ^7.37.5 - React-specific linting rules
- **eslint-plugin-react-hooks**: ^5.2.0 - Hooks linting rules
- **eslint-plugin-jsx-a11y**: ^6.10.2 - Accessibility linting
- **eslint-plugin-import**: ^2.32.0 - Import/export linting
- **prettier**: ^3.6.2 - Code formatting
- **husky**: ^9.1.7 - Git hooks management
- **lint-staged**: ^16.2.0 - Staged files linting
- **svgstore**: ^3.0.1 - SVG sprite generation

## 🧪 Testing Strategy

### Testing Architecture (Recommended)

While not yet implemented, the project structure supports comprehensive testing:

```text
src/
├── __tests__/
│   ├── setup.js              # Test environment setup
│   ├── utils.js              # Test utilities and helpers
│   └── mocks/                # API mocks and fixtures
├── components/
│   └── Button/
│       ├── Button.jsx
│       ├── Button.module.css
│       └── Button.test.jsx   # Component tests
└── pages/
    └── HomePage/
        ├── HomePage.jsx
        └── HomePage.test.jsx # Integration tests
```

### Testing Tools and Libraries

- **Vitest**: Fast unit testing framework (Vite-native)
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for integration tests
- **Playwright**: End-to-end testing
- **@testing-library/jest-dom**: Custom matchers for DOM testing

## 🤝 Contributing

### Development Guidelines

1. **Create Feature Branch**: `git checkout -b feature/your-feature`
2. **Follow Code Standards**: Run linting before commits
3. **Write Tests**: Add tests for new components/features (when testing is set up)
4. **Commit Changes**: Use conventional commit messages
5. **Create Pull Request**: Submit for review

### Code Standards

- Use functional components with hooks exclusively
- Follow component naming conventions (PascalCase for components)
- Implement proper prop validation with PropTypes when needed
- Write semantic HTML with accessibility in mind
- Use CSS Modules for component styling
- Add JSDoc comments for complex functions and hooks
- Follow Redux Toolkit patterns for state management
- Use TypeScript-style JSDoc for better IDE support

### Commit Message Format

```bash
# Examples
feat: add user profile avatar upload
fix: resolve recipe card image loading issue
docs: update API integration guide
style: improve responsive design for mobile
refactor: extract custom hook for auth logic
```

### Code Review Checklist

- [ ] Components use proper accessibility attributes
- [ ] Forms include proper validation with Formik/Yup
- [ ] State management follows Redux Toolkit patterns
- [ ] Responsive design works on all breakpoints
- [ ] Images use proper loading and alt attributes
- [ ] Error boundaries are implemented where needed
- [ ] Performance considerations (memoization, lazy loading)
- [ ] Clean code principles (DRY, SOLID, readable)

## 🔐 Security Considerations

### Authentication Security

- JWT tokens stored securely with Redux Persist
- Automatic token refresh and logout on expiration
- HTTPS enforced in production
- Input validation on all forms
- XSS protection with proper sanitization

### API Security

- Authorization headers on all authenticated requests
- Request/response interceptors for token management
- Error handling that doesn't expose sensitive information
- Rate limiting considerations for API calls
- CORS configuration for allowed origins

## 📊 Analytics and Monitoring

### SEO Optimization

- React Helmet Async for dynamic meta tags
- Semantic HTML structure
- Proper heading hierarchy
- Alt attributes for images
- Structured data ready for implementation

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

---

**Related Projects:**

- [Yummi API](https://github.com/VOSolyanik/project-yummi-api) - Backend service for this application

For questions, support, or contributions, please refer to the project documentation or create an issue in the repository.
