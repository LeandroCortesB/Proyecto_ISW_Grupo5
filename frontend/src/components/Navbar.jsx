import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from '@services/auth.service.js';
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import '@styles/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();  // Obtén el usuario desde el contexto.
    const userRole = user?.rol;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Aquí podrías realizar acciones adicionales si necesitas cuando el usuario cambie.
    }, [user]);

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/auth'); 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const toggleMenu = () => {
        if (!menuOpen) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
        setMenuOpen(!menuOpen);
    };

    const removeActiveClass = () => {
        const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
        activeLinks.forEach(link => link.classList.remove('active'));
    };

    const addActiveClass = () => {
        const links = document.querySelectorAll('.nav-menu ul li a');
        links.forEach(link => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('active');
            }
        });
    };

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Inicio
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                    <li>
                        <NavLink 
                            to="/users" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Usuarios
                        </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink 
                            to="/auth" 
                            onClick={() => { 
                                logoutSubmit(); 
                                setMenuOpen(false); 
                            }} 
                            activeClassName="active"
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            {user && (
                <div className="username-display">
                    Hola {user.nombreCompleto || 'Usuario'}! 😊
                </div>
            )}
        </nav>
    );
};

export default Navbar;
