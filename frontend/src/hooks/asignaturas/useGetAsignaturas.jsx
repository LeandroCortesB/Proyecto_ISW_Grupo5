import { useState, useEffect } from 'react';
import { getAsignaturas } from '@services/asignatura.service.js'; // Importa el servicio para obtener las asignaturas

const useGetAsignaturas = () => {
    const [asignaturas, setAsignaturas] = useState([]); // Estado para almacenar las asignaturas
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState(null); // Estado para manejar errores

    const fetchAsignaturas = async () => {
        try {
            setLoading(true);
            const response = await getAsignaturas(); // Llama al servicio para obtener las asignaturas
            setAsignaturas(response); // Guarda las asignaturas en el estado
        } catch (err) {
            console.error("Error fetching asignaturas: ", err);
            setError(err); // Guarda el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    useEffect(() => {
        fetchAsignaturas(); // Llama a fetchAsignaturas al montar el componente
    }, []);

    return { asignaturas, loading, error, fetchAsignaturas };
}

export default useGetAsignaturas;