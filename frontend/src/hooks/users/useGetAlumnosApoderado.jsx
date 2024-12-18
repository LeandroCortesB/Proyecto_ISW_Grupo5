import { useState, useEffect } from 'react';
import { getAlumnosByApoderado } from '@services/user.service.js';

const useAlumnosApoderado = (id) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getAlumnosByApoderado(id);
            console.log("response: ", response[1]);    
            const formattedData = response.map(user => ({
                nombreCompleto: user.nombreCompleto,
                rut: user.rut,
                email: user.email,
                rol: user.rol,
                createdAt: user.createdAt
            }));
            console.log("formattedData: ", formattedData);
            setUsers(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, fetchUsers, setUsers };
};

export default useAlumnosApoderado;