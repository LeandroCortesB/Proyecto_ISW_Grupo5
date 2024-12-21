import { useState, useEffect } from 'react';
import { getNota } from '@services/nota.service.js'; 

const useGetNota = (idNota) => {
    const [nota, setNota] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const fetchNota = async () => {
        try {
            setLoading(true);
            const response = await getNota(idNota); 
            setNota(response); 
        } catch (err) {
            console.error("Error fetching nota: ", err);
            setError(err); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => { 
        if (idNota) fetchNota(); 
    }, [idNota]);

    return { nota, loading, error, fetchNota };
}

export default useGetNota;