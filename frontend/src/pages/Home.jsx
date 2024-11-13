import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust this path if needed
import '@styles/home.css';

const Home = () => {
    const { user } = useAuth();

    useEffect(() => {
        console.log('User data:', user); // Check the content of user object
    }, [user]);

    return (
        <div className="home-container">
            <div className="username-display">
                Welcome, {user?.name || 'User'}!
            </div>
            {/* Rest of your Home content */}
        </div>
    );
};

export default Home;
