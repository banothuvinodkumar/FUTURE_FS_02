import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
