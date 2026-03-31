import api from './api';

export const authService = {
  async register(data: { fullName: string; email: string; phone?: string; password: string; role?: string }) {
    // TEMPORARY HACKATHON MOCK
    return {
      success: true,
      data: { userId: 'mock-user-123', message: 'Registration successful' }
    };
  },

  async verifyOTP(userId: string, otp: string) {
    // TEMPORARY HACKATHON MOCK
    return { success: true };
  },

  async login(data: { email: string; password: string; totpToken?: string; smsOtp?: string }) {
    // TEMPORARY HACKATHON MOCK
    const mockUser = {
      id: 'mock-user-123',
      fullName: 'Demo User',
      email: data.email,
      role: 'litigant'
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', 'mock-token-abc-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
    }

    return {
      success: true,
      data: {
        accessToken: 'mock-token-abc-123',
        user: mockUser
      }
    };
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
