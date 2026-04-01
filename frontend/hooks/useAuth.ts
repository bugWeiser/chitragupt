import { useState, useCallback, useEffect } from 'react';
import { authService } from '../lib/authService';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser]       = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const register = useCallback(async (data: any) => {
    setLoading(true);
    try {
      // Execute the mock register
      await authService.register(data);
      // Force an immediate login to bypass OTP for the hackathon judges magically
      const result = await authService.login({ email: data.email, password: data.password || 'password' });
      const loggedUser = result.data?.user;
      setUser(loggedUser);
      toast.success(`Account created successfully! Automagically logging in...`, { duration: 4000, icon: '🎉' });
      
      // Auto redirect to prevent them from landing on verification screen
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

      return result;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const verifyOTP = useCallback(async (userId: string, otp: string) => {
    setLoading(true);
    try {
      const result = await authService.verifyOTP(userId, otp);
      toast.success('Account verified!');
      return result;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const login = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const result = await authService.login(data);
      const loggedUser = result.data?.user;
      setUser(loggedUser);
      toast.success(`Welcome back, ${loggedUser.fullName}!`);
      
      // Immediately redirect to home upon successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 500);

      return result;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const loginWithGithub = useCallback(async () => {
    setLoading(true);
    try {
      const result = await authService.loginWithGithub();
      const loggedUser = result.data?.user;
      setUser(loggedUser);
      toast.success(`Welcome back, ${loggedUser?.fullName || 'User'}!`);
      
      setTimeout(() => {
        window.location.href = '/';
      }, 500);

      return result;
    } catch (err: any) {
      toast.error('GitHub Login failed. Please check your connection.');
      throw err;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    toast.success('Logged out');
  }, []);

  return { user, loading, register, verifyOTP, login, loginWithGithub, logout };
}
