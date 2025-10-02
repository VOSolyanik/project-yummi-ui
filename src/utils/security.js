// Enhanced auth utilities with security best practices
export const authSecurityUtils = {
  // Secure token validation
  isTokenValid: token => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      return !isExpired;
    } catch (error) {
      console.error('Invalid token format:', error);
      return false;
    }
  },

  // Get token expiry time
  getTokenExpiry: token => {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Cannot parse token:', error);
      return null;
    }
  }
};
