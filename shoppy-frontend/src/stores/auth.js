import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    status: '', // 'loading', 'success', 'error'
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async login(credentials) {
        console.log('login event');
      try {
        this.status = 'loading';
        const response = await axios.post(API_BASE_URL+"/auth/login", credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.token = token;
        this.status = 'success';
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        this.status = 'error';
        console.error('Login error:', error);
      }
    },
    async register(authData) {

        console.log('register event');
        try {
          this.status = 'loading';
          const response = await axios.post(API_BASE_URL+"/auth/register", authData);
          const token = response.data.token; // Assuming your backend also returns a token upon registration
          localStorage.setItem('token', token);
          this.token = token;
          this.status = 'success';
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          this.status = 'error';
          console.error('Registration error:', error);
        }
    },
    logout() {
      console.log('logout event');
      localStorage.removeItem('token');
      this.token = '';
      delete axios.defaults.headers.common['Authorization'];
    }
  },
});
