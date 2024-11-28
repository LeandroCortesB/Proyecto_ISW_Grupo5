import { useState, useEffect } from 'react';
import { getCurso } from '@services/curso.service.js'; // Importa el servicio para obtener un curso

const useGetCurso = (idCurso) => {
    const [curso, setCurso] = useState(null); // Estado para almacenar el curso
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchCurso = async () => {
        try {
            setLoading(true);
            const response = await getCurso(idCurso); // Llama al servicio con el id del curso
            const formattedCurso = {
                idCurso: response.idCurso,
                nombreCurso: response.nombreCurso,
                createdAt: response.createdAt,
            };
            setCurso(formattedCurso); // Guarda el curso formateado en el estado
        } catch (err) {
            console.error("Error fetching curso: ", err);
            setError(err); // Guarda el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        if (idCurso) fetchCurso(); // Llama a fetchCurso solo si hay un id definido
    }, [idCurso]);

    return { curso, loading, error, fetchCurso };
}

export default useGetCurso;