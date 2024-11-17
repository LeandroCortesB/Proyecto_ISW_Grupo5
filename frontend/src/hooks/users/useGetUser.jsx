import { useState, useEffect } from 'react';
import { getUser } from '@services/user.service.js'; // Importa el servicio para obtener un usuario

const useGetUser = (rut) => {
    const [user, setUser] = useState(null); // Estado para almacenar el usuario
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUser(rut); // Llama al servicio con el rut del usuario
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
