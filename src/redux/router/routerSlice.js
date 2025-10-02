import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPath: '/',
  previousPath: null,
  pendingPrivateRoute: null, // Store the route user tried to access before auth
  isNavigating: false
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setCurrentPath: (state, action) => {
      state.previousPath = state.currentPath;
      state.currentPath = action.payload;
      state.isNavigating = false;
    },
    setPendingPrivateRoute: (state, action) => {
      state.pendingPrivateRoute = action.payload;
    },
    clearPendingPrivateRoute: state => {
      state.pendingPrivateRoute = null;
    },
    setNavigating: (state, action) => {
      state.isNavigating = action.payload;
    },
    resetRouter: state => {
      state.currentPath = '/';
      state.previousPath = null;
      state.pendingPrivateRoute = null;
      state.isNavigating = false;
    }
  }
});

export const { setCurrentPath, setPendingPrivateRoute, clearPendingPrivateRoute, setNavigating, resetRouter } =
  routerSlice.actions;

// Selectors
export const selectCurrentPath = state => state.router.currentPath;
export const selectPreviousPath = state => state.router.previousPath;
export const selectPendingPrivateRoute = state => state.router.pendingPrivateRoute;
export const selectIsNavigating = state => state.router.isNavigating;

export default routerSlice.reducer;
