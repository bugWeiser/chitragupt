import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth`;

// Configure axios to include cookies for refreshToken
axios.defaults.withCredentials = true;

export const authService = {
  async register(data: any) {
    return axios.post(`${API_BASE_URL}/register`, data);
  },

  async verifyOTP(userId: string, otp: string) {
    return axios.post(`${API_BASE_URL}/verify-otp`, { userId, otp });
  },

  async login(data: any) {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    if (response.data.success) {
      const { accessToken, user } = response.data.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    return response;
  },

  async loginWithGoogle() {
    // Firebase Google Sign-In
    try {
      const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      const { default: firebaseApp } = await import('../lib/firebase');
      
      if (!firebaseApp) {
        toast.error("Google SSO is currently disabled in this staging environment. Please use Email/Password.");
        throw new Error("Firebase SDK failed to initialize. Missing API Key.");
      }

      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const user = {
        id: firebaseUser.uid,
        fullName: firebaseUser.displayName || 'Google User',
        email: firebaseUser.email,
        role: firebaseUser.email === 'bug74609@gmail.com' ? 'admin' : 'litigant',
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', await firebaseUser.getIdToken());
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { data: { success: true, data: { user } } };
    } catch (err: any) {
      console.error('[Google Auth] Failed:', err.message);
      throw err;
    }
  },

  async logout() {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
    } catch (err) {
      console.error('Logout API failed:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  },

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  },

  isAuthenticated() {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('accessToken');
    }
    return false;
  }
};

