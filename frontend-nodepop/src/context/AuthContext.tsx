import { createContext, useContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, remember: boolean) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);

        }
    
    }, []);
    
    const login = (token: string, remember: boolean) => {
        if (remember) {
            localStorage.setItem('authToken', token);
        } else {
            sessionStorage.setItem('authToken', token);
        }
        setIsAuthenticated(true);
        navigate('/');
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    };
    return context; 
};