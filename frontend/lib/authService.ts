import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth`;

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

  async loginWithGithub() {
    // Current bypass since user doesn't have firebase account setup yet
    console.log('[MOCK AUTH] GitHub Login Bypass');
    const mockUser = { id: 'gh-' + Date.now(), fullName: 'GitHub User', email: 'gh@example.com', role: 'litigant' };
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', 'mock-gh-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    return { data: { success: true, data: { user: mockUser } } };
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

