import { useState, useEffect } from 'react';
import { getAsignaturas } from '@services/asignatura.service.js'; 


const useGetAsignaturas = () => {
    const [asignaturas, setAsignaturas] = useState([]); 
    
    const fetchAsignaturas = async () => {
        try {
            const response = await getAsignaturas(); 
            const formattedData = response.map(asignatura => ({
                idAsignatura: asignatura.idAsignatura,
                nombreAsignatura: asignatura.nombreAsignatura,
                curso: asignatura.curso,
                createdAt: asignatura.createdAt
            }));
            dataLogged(formattedData);
            setAsignaturas(formattedData);
        } catch (err) {
            console.error("Error fetching asignaturas: ", err);
        }
    };
    useEffect(() => {
        fetchAsignaturas();
    }, []); 
    const dataLogged = (formattedData) => {
        try {
            const { idAsignatura } = JSON.parse(sessionStorage.getItem('asignatura'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].idAsignatura === idAsignatura) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };
    return [asignaturas, fetchAsignaturas, setAsignaturas];

}

export default useGetAsignaturas;