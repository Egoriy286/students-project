// src/services/auth.js
import axios from 'axios';
import {API_BASE_URL} from '../config'

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/token`, new URLSearchParams({
    username: email,
    password,
  }));
  return response.data;
};

export const register = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
  return response.data;
};

export async function logout (){

    try {
      await axios.post(`${API_BASE_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      this.$router.push('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
}