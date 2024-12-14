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
            setAsignaturas(response);
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