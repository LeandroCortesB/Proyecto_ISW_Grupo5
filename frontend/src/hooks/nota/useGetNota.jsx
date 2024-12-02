import { useState, useEffect } from 'react';
import { getNota } from '@services/nota.service.js'; // Importa el servicio para obtener las notas

const useGetNota = (idNota) => {
    const [nota, setNota] = useState([]); // Estado para almacenar las notas
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchNota = async () => {
        try {
            setLoading(true);
            const response = await getNota(idNota); // Llama al servicio para obtener las notas
            setNota(response); // Guarda las notas en el estado
        } catch (err) {
            console.error("Error fetching nota: ", err);
            setError(err); // Guarda el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        fetchNota(); // Llama a fetchNotas al montar el componente
    }, []);

    return { nota, loading, error, fetchNota };
}

export default useGetNota;