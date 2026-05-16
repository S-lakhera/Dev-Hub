import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

    const checkAuth = async () => {
        try {
            const { data } = await api.get('/users/me');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        const loadingToast = toast.loading("Logging out...");
        try {
            await api.post("/auth/logout"); // Backend cookie clearing route
            setUser(null); // Local state clean
            toast.success("Logged out successfully", { id: loadingToast });
        } catch (error) {
            console.log(error);
            
            toast.error(error.response?.data?.message || "Logout failed", { id: loadingToast });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};