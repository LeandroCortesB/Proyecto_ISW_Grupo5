import { useState, useEffect } from 'react';
import { getAsignatura } from '@services/asignatura.service.js';

const useGetAsignaturas = (idAsignatura) => {
 const [asignatura, setAsignaturas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAsignatura = async () => {
        try {
            setLoading(true);
            const response = await getAsignatura(idAsignatura);
            const formattedAsignatura = {
                idAsignatura: response.idAsignatura,
                nombreAsignatura: response.nombreAsignatura,
                curso: response.curso,
                createdAt: response.createdAt
            };
            setAsignaturas(formattedAsignatura);
        } catch (err) {
            console.error("Error fetching asignatura: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (idAsignatura) fetchAsignatura();
    }, [idAsignatura]);
    return { asignatura, loading, error, fetchAsignatura };
}
export default useGetAsignaturas;