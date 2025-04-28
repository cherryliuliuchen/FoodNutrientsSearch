import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../helper/apiClient';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/user/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      console.log("Token stored:", localStorage.getItem('accessToken')); 
      setUser({ email });
      navigate('/my-information');
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/user/logout');
      localStorage.removeItem('accessToken');
      setUser(null);
      navigate('/account');
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      await apiClient.post('/user/register', { name, email, password });
      await login(email, password);
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Registration failed');
    }
  };

  return { user, login, logout, register };
};

export default useAuth;
