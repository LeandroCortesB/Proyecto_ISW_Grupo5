import { useState, useEffect } from 'react';
import { getPagina } from '@services/pagina.service.js'; 

const useGetUser = (rut) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getPagina(idHoja); 
            const formattedUser = {
                nombreCompleto: response.nombreCompleto,
                rut: response.rut,
                email: response.email,
                rol: response.rol,
                createdAt: response.createdAt,
            };
            setUser(formattedUser); // Guarda el usuario formateado en el estado
        } catch (err) {
            console.error("Error fetching user: ", err);
            setError(err); // Guarda el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        if (rut) fetchUser(); // Llama a fetchUser solo si hay un rut definido
    }, [rut]);

    return { user, loading, error, fetchUser };
};

export default useGetUser;
