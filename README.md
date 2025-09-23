# Yummi UI

A modern React frontend application for the Yummi recipe sharing platform. Built with React 19, Vite, and modern development tools, providing users with an intuitive interface to discover, share, and manage their favorite recipes. The project features a component-based architecture optimized for performance and developer experience.

## 🚀 Features

### Core Functionality
- **Recipe Discovery**: Browse and search through recipes
- **User Authentication**: Sign up, login, and profile management
- **Favorites Management**: Save and organize favorite recipes
- **Social Features**: Follow users and discover new content
- **Responsive Design**: Mobile-first, cross-device compatibility

### Technical Features
- **React 19** with latest features and optimizations
- **Vite** for lightning-fast development and builds
- **React Router** for client-side navigation with lazy loading
- **Form Management** with Formik and Yup validation
- **Toast Notifications** with react-hot-toast
- **Modern CSS** with CSS Modules and CSS Custom Properties
- **Path Aliases** for clean imports
- **Code Quality** tools (ESLint, Prettier, Husky)
- **SEO Optimization** with React Helmet Async
- **Performance Optimization** with code splitting and lazy loading
- **Deployment Ready** for Vercel platform

## 🏗️ Project Structure

```text
project-yummi-ui/
├── src/
│   ├── App.jsx              # Main App component with routing
│   ├── App.module.css       # Global app styles
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global CSS and CSS variables
│   ├── assets/             # Static assets (images, icons, fonts)
│   ├── components/         # Reusable UI components
│   │   ├── Button/         # Button component with variants
│   │   ├── Header/         # Application header
│   │   ├── Icon/           # Icon component system
│   │   └── Loader/         # Loading spinner component
│   ├── pages/              # Page components
│   │   ├── HomePage/       # Main landing page
│   │   └── NotFoundPage/   # 404 error page
│   ├── constants/          # Application constants
│   └── services/           # API services and utilities
├── public/                 # Public static files
├── .husky/                 # Git hooks configuration
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite configuration
├── jsconfig.json           # JavaScript project configuration
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

### Architecture Principles

- **Component-Based**: Modular, reusable components with single responsibility
- **Container/Presentational**: Pages handle logic, components handle presentation
- **Path Aliases**: Clean imports using `@` prefixed aliases
- **CSS Modules**: Scoped styling to prevent conflicts
- **Lazy Loading**: Code splitting for optimal performance
- **Modern Patterns**: Hooks, functional components, and latest React features

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
npm run build       # Build for production
npm run preview     # Preview production build locally
npm run lint        # Run ESLint for code quality checks
npm run prepare     # Setup Husky git hooks
```

## 🎨 Styling Architecture

### CSS Organization

- **CSS Modules**: Component-scoped styles (`.module.css`)
- **Global Styles**: Application-wide styles in `index.css`
- **CSS Custom Properties**: Design tokens for consistent theming
- **Modern CSS**: Flexbox, Grid, and CSS logical properties

### Design System

```css
/* CSS Custom Properties for consistent theming */
:root {
  --color-primary: #ff6b35;
  --color-secondary: #004643;
  --color-accent: #f9bc60;
  --color-neutral: #abd1c6;
  --color-background: #fffffe;
  --color-text: #004643;
  
  --font-family-primary: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --spacing-unit: 0.5rem;
  --border-radius: 0.5rem;
}
```

### Component Styling Guidelines

- Use CSS Modules for component-specific styles
- Follow BEM methodology for class naming
- Use CSS Custom Properties for consistent theming
- Implement mobile-first responsive design
- Use `clsx` for conditional class names

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
import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <button 
      className={clsx(css.button, css[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Page Development

1. **Create Page Directory**: `src/pages/PageName/`
2. **Page Component**: Handle routing and data logic
3. **Use Lazy Loading**: Wrap with `lazy()` for code splitting
4. **SEO Optimization**: Add Helmet for meta tags

### Adding New Features

1. **Components**: Create reusable UI components
2. **Pages**: Implement page-level logic and layouts
3. **Services**: Add API integration in services folder
4. **Constants**: Define application constants
5. **Routing**: Update routing in `App.jsx`

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

### Service Layer Setup

The `services/` folder is ready for API integration:

```javascript
// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### Environment Variables

Create `.env.local` for local development:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Yummi - Recipe Sharing Platform
```

## 🎯 Performance Optimization

### Current Optimizations

- **Code Splitting**: Lazy loading for pages and components
- **Tree Shaking**: Automatic dead code elimination with Vite
- **Asset Optimization**: Image optimization and compression
- **Modern Bundle**: ES modules for modern browsers
- **CSS Optimization**: Scoped styles with CSS Modules

### Performance Best Practices

- Use `React.memo()` for expensive components
- Implement virtual scrolling for large lists
- Optimize images with modern formats (WebP, AVIF)
- Use dynamic imports for non-critical code
- Implement service workers for caching

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

- **react**: ^19.1.1 - UI library with latest features
- **react-dom**: ^19.1.1 - DOM rendering for React
- **react-router-dom**: ^7.9.1 - Client-side routing
- **formik**: ^2.4.6 - Form state management
- **yup**: ^1.7.1 - Schema validation for forms
- **react-hot-toast**: ^2.6.0 - Toast notification system
- **react-helmet-async**: ^2.0.5 - SEO and document head management
- **clsx**: ^2.1.1 - Conditional class name utility
- **modern-normalize**: ^3.0.1 - CSS normalization

### Development Dependencies

- **vite**: ^7.1.7 - Build tool and dev server
- **eslint**: ^9.36.0 - Code linting and quality
- **prettier**: ^3.6.2 - Code formatting
- **husky**: ^9.1.7 - Git hooks management
- **lint-staged**: ^16.2.0 - Staged files linting

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/your-feature`
3. **Follow Code Standards**: Run `npm run lint` before commits
4. **Write Tests**: Add tests for new components/features
5. **Commit Changes**: Use conventional commit messages
6. **Create Pull Request**: Submit for review

### Code Standards

- Use functional components with hooks
- Follow component naming conventions (PascalCase)
- Implement proper prop validation
- Write semantic HTML with accessibility in mind
- Use CSS Modules for component styling
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

---

**Connected Projects:**
- [Yummi API](../project-yummi-api) - Backend service for this application

For questions or support, please refer to the project documentation or create an issue in the repository.
