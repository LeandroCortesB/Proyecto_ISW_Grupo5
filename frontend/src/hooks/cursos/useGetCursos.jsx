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
            dataLogged(formattedData);
            setCursos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    const dataLogged = (formattedData) => {
        try {
            const { id } = JSON.parse(sessionStorage.getItem('curso'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].idCurso === id) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { cursos, fetchCursos, setCursos };
};

export default useCursos;