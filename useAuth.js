import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [username, setUsername] = useState(() => localStorage.getItem('username'));
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const login = async (usernameInput, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api-auth/login/', {
                username: usernameInput,
                password,
            });
            const { access } = response.data;
            setToken(access);
            setUsername(usernameInput);
            localStorage.setItem('token', access);
            localStorage.setItem('username', usernameInput);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`; // Use access directly
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        }
    };
    
    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        delete axios.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        if (!token) {
            logout();
        }
    }, [token]);

    return { username, token, login, logout };
};

export default useAuth;
