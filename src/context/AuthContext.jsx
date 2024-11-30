import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
                setUser(res.data);
                
                // Si estamos en la página de login y el usuario está autenticado,
                // redirigimos al dashboard
                if (location.pathname === '/login') {
                    navigate('/dashboard');
                }
            } else {
                // Si no hay token y no estamos en login o register,
                // redirigimos a login
                if (!['/login', '/register'].includes(location.pathname)) {
                    navigate('/login');
                }
            }
        } catch (error) {
            localStorage.removeItem('token');
            if (!['/login', '/register'].includes(location.pathname)) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { 
                email, 
                password 
            });
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data.user);
            navigate('/dashboard');
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
