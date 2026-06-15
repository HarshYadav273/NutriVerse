import { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nutriverse_token'));
  const [loading, setLoading] = useState(true);

  // Load user profile on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { data } = await API.get('/api/user/profile');
          setUser(data);
        } catch {
          // Token expired or invalid
          localStorage.removeItem('nutriverse_token');
          localStorage.removeItem('nutriverse_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await API.post('/api/auth/login', { email, password });
    localStorage.setItem('nutriverse_token', data.token);
    localStorage.setItem('nutriverse_user', JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await API.post('/api/auth/register', { name, email, password });
    localStorage.setItem('nutriverse_token', data.token);
    localStorage.setItem('nutriverse_user', JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('nutriverse_token');
    localStorage.removeItem('nutriverse_user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const { data } = await API.put('/api/user/profile', profileData);
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
