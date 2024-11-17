import { useState, useEffect } from 'react';
import { getCursos } from '@services/curso.service.js';

const useCursos = () => {
    const [cursos, setCursos] = useState([]);

    const fetchCursos = async () => {
        try {
            const response = await getCursos();
            const formattedData = response.map(curso => ({
                nombreCurso: curso.nombreCurso,
                createdAt: curso.createdAt
            }));
            setCursos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return { cursos, fetchCursos, setCursos };
};

export default useCursos;