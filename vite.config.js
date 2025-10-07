import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import ViteImageOptimize from 'vite-plugin-imagemin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // CSS injection plugin to eliminate render-blocking CSS
    cssInjectedByJsPlugin({
      topExecutionPriority: false,
      jsAssetsFilterFunction: function (outputAsset) {
        // Only inject CSS for main chunks to reduce render blocking
        return outputAsset.isEntry || outputAsset.isDynamicEntry;
      }
    }),
    // Image optimization plugin
    ViteImageOptimize({
      // GIF optimization
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      // JPEG optimization
      mozjpeg: {
        quality: 85,
        progressive: true
      },
      // PNG optimization
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      // SVG optimization
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      },
      // WebP optimization
      webp: {
        quality: 85
      }
    })
  ],
  build: {
    sourcemap: true,
    // CSS code splitting for better performance
    cssCodeSplit: true,
    // Additional build optimizations
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          router: ['react-router-dom'],
          forms: ['formik', 'yup'],
          ui: ['react-hot-toast', 'react-helmet-async', 'clsx']
        },
        // Optimize CSS file naming for better caching
        assetFileNames: (assetInfo) => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@services': path.resolve(__dirname, './src/services')
    }
  }
});
