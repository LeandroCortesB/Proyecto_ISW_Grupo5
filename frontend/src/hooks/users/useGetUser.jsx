import { useState, useEffect } from 'react';
import { getUser } from '@services/user.service.js';

const useGetUser = (rut) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUser(rut); 
            const formattedUser = {
                nombreCompleto: response.nombreCompleto,
                rut: response.rut,
                email: response.email,
                rol: response.rol,
                createdAt: response.createdAt,
            };
            setUser(formattedUser); 
        } catch (err) {
            console.error("Error fetching user: ", err);
            setError(err); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (rut) fetchUser(); 
    }, [rut]);

    return { user, loading, error, fetchUser };
};

export default useGetUser;
