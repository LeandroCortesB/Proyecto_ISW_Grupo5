import { useState, useEffect } from 'react';
import { getAlumnos } from '@services/user.service.js';

const useAlumnos = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getAlumnos();
            console.log("response: ", response[1]);    
            const formattedData = response.map(user => ({
                nombreCompleto: user.nombreCompleto,
                rut: user.rut,
                email: user.email,
                rol: user.rol,
                curso: user.curso,
                createdAt: user.createdAt
            }));
            console.log("formattedData: ", formattedData);
            dataLogged(formattedData);
            setUsers(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { users, fetchUsers, setUsers };
};

export default useAlumnos;