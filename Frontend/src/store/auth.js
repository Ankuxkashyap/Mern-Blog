import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  error: null,

  login: async ({ email, password }) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      set({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        error: null,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login successful!');
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return {
        success: false,
        message: err.response?.data?.message || 'Login error',
      };
    }
  },

  register: async ({ fullName, email, password }) => {
    try {
      console.log('Registering user:', { fullName, email, password });
      const res = await axios.post('http://localhost:3000/api/users', {
        fullName,
        email,
        password,
      });

      set({
        user: res.data.user,
        token: res.data.token,
        isAuthenticated: true,
        error: null,
      });
      // console.log('Registration response:', res.data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Registration successful!');
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return {
        success: false,
        message: err.response?.data?.message || 'Registration error',
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    toast.success('Logout successful!');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
