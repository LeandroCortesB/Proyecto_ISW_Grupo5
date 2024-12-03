import { useState, useEffect } from 'react';
import { getNotas } from '@services/nota.service.js'; // Importa el servicio para obtener las notas

const useGetNotas = () => {
    const [notas, setNotas] = useState([]); // Estado para almacenar las notas
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchNotas = async () => {
        try {
            setLoading(true);
            const response = await getNotas(); // Llama al servicio para obtener las notas
            setNotas(response); // Guarda las notas en el estado
        } catch (err) {
            console.error("Error fetching notas: ", err);
            setError(err); // Guarda el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        fetchNotas(); // Llama a fetchNotas al montar el componente
    }, []);

    return { notas, loading, error, fetchNotas };
}

export default useGetNotas;