import { useState, useEffect } from 'react';
import { getCursos } from '@services/curso.service.js';

const useGetCursos = () => {
    const [cursos, setCursos] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchCursos = async () => {
        try {
            setLoading(true);
            const response = await getCursos(); 
            setCursos(response); 
        } catch (err) {
            console.error("Error fetching cursos: ", err);
            setError(err);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchCursos(); 
    }, []);

    return { cursos, loading, error, fetchCursos };
}

export default useGetCursos;