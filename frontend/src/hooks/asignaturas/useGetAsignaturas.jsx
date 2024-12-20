import { useState, useEffect } from 'react';
import { getAsignaturas } from '@services/asignatura.service.js';

const useGetAsignaturas = () => {
    const [asignaturas, setAsignaturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAsignaturas = async () => {
        try {
            setLoading(true);
            const response = await getAsignaturas();
            const formatAsignaturaData = response.map(asignatura => ({
                nombreAsignatura: asignatura.nombreAsignatura,
                idAsignatura: asignatura.idAsignatura,
                idCurso: asignatura.idCurso,
                createdAt: asignatura.createdAt,
            })) ;
            setAsignaturas(formatAsignaturaData);
            console.log("Asignaturas:", formatAsignaturaData);
        } catch (err) {
            console.error("Error fetching asignaturas: ", err);
            setError(err); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAsignaturas();
    }
    , []);  

    return { asignaturas, setAsignaturas, loading, error, fetchAsignaturas };

}


export default useGetAsignaturas;