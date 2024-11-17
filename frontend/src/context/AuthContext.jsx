import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('usuario')) || null);
    const navigate = useNavigate();

    const isAuthenticated = !!user; // Devuelve `true` si hay un usuario, `false` en caso contrario.

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth'); // Redirige al login si no hay usuario autenticado.
        }
    }, [isAuthenticated, navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
