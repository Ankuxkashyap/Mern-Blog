import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  setUser: (user, token) =>
    set({
      isAuthenticated: true,
      user: user,
      token: token,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    }),

  // Only use this if needed, don't auto-call it
  init: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
