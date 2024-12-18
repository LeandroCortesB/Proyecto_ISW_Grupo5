import { useState, useEffect } from 'react';
import { getHoja } from '@services/hoja.service.js'; 

const useGetHoja = (rut) => {
    const [hoja, setHoja] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchHoja = async () => {
        try {
            setLoading(true);
            const response = await getHoja(rut); 
            const formattedHoja = {
                nombreCompleto: response.nombreCompleto,
                rut: response.rut,
                anotacion: response.anotacion,
                buena: response.buena,
                createdAt: response.createdAt,
            };
            setHoja(formattedHoja); 

        } catch (err) {
            console.error("Error fetching hoja: ", err);
            setError(err); 
            
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (rut) fetchHoja(); 
    }, [rut]);

    return { hoja, loading, error, fetchHoja };
};

export default useGetHoja;
