import { auth, githubProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const authService = {
  async register(data: { fullName: string; email: string; phone?: string; password: string; role?: string }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return { success: response.ok, data: result.data, message: result.message };
  },

  async verifyOTP(userId: string, otp: string) {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, otp }),
    });
    return { success: response.ok };
  },

  async login(data: { email: string; password: string; totpToken?: string; smsOtp?: string }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (response.ok && result.data?.accessToken) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
    }

    return { success: response.ok, data: result.data, message: result.message };
  },

  async loginWithGithub() {
    try {
      const authResult = await signInWithPopup(auth, githubProvider);
      const idToken = await authResult.user.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      
      const result = await response.json();
      if (response.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', result.data.accessToken);
          localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        return { success: true, data: result.data };
      }
      return { success: false, message: result.message };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
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

