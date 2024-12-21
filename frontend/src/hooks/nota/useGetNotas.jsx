import { useState, useEffect } from 'react';
import { getNotas } from '@services/nota.service.js';

const useGetNotas = () => {
    const [notas, setNotas] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchNotas = async () => {
        try {
            setLoading(true);
            const response = await getNotas(); 
            setNotas(response); 
        } catch (err) {
            console.error("Error fetching notas: ", err);
            setError(err);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchNotas(); 
    }, []);

    return { notas, loading, error, fetchNotas, setNotas };
}

export default useGetNotas;