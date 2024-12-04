import { useState, useEffect } from 'react';
import { getHojas } from '@services/hoja.service.js'; 

const useGetHojas = (rut) => {
  const [hojas, setHojas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchHojas = async () => {
    try {
      setLoading(true);
      const [response, error] = await getHojas(rut); 
      if (error) {
        throw new Error(error);
      }
      setHojas(response); 

    } catch (err) {
      console.error("Error fetching hojas: ", err);
      setError(err.message); 
      
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (rut) fetchHojas(); 
  }, [rut]);

  return { hojas, loading, error, fetchHojas }; 
};

export default useGetHojas;
