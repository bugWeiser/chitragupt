import { auth, githubProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth`;

export const authService = {
  async register(data: { fullName: string; email: string; phone?: string; password: string; role?: string }) {
    console.log('[MOCK AUTH] Registering user:', data.email);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: { userId: 'mock-user-id', otp: '123456' }, message: 'Registration started.' };
  },

  async verifyOTP(userId: string, otp: string) {
    console.log('[MOCK AUTH] Verifying OTP:', otp);
    await new Promise(resolve => setTimeout(resolve, 800));
    if (otp !== '123456') {
      return { success: false, message: 'Invalid OTP' };
    }
    return { success: true };
  },

  async login(data: { email: string; password: string; totpToken?: string; smsOtp?: string }) {
    console.log('[MOCK AUTH] Logging in user:', data.email);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept any credentials for demo
    const mockUser = {
      id: 'demo-user-' + Math.floor(Math.random() * 1000),
      fullName: data.email.split('@')[0],
      email: data.email,
      role: 'litigant',
      isEmailVerified: true
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', 'mock-jwt-token-123456');
      localStorage.setItem('user', JSON.stringify(mockUser));
    }

    return { success: true, data: { accessToken: 'mock-jwt-token-123456', user: mockUser }, message: 'Login successful' };
  },

  async loginWithGithub() {
    try {
      console.log('[MOCK AUTH] Triggering GitHub popup Bypass');
      // Simulate network request instead of hitting firebase
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: 'github-user-' + Math.floor(Math.random() * 1000),
        fullName: 'GitHub User',
        email: 'developer@github.com',
        role: 'litigant',
        isEmailVerified: true
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', 'mock-github-token-123456');
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
      return { success: true, data: { accessToken: 'mock-github-token-123456', user: mockUser } };
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

