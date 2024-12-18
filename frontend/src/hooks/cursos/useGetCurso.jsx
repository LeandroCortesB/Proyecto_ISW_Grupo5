import { useState, useEffect } from 'react';
import { getCurso } from '@services/curso.service.js';

const useGetCurso = (idCurso) => {
    const [curso, setCurso] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const fetchCurso = async () => {
        try {
            setLoading(true);
            const response = await getCurso(idCurso); 
            const formattedCurso = {
                idCurso: response.idCurso,
                nombreCurso: response.nombreCurso,
                createdAt: response.createdAt,
            };
            setCurso(formattedCurso); 
        } catch (err) {
            console.error("Error fetching curso: ", err);
            setError(err); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (idCurso) fetchCurso();  
    }, [idCurso]);

    return { curso, loading, error, fetchCurso };
}

export default useGetCurso;