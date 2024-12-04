import { useState, useEffect } from 'react';
import { getHojas } from '@services/hoja.service.js'; 

const useGetHojas = (rut) => {
  const [ hojas, setHojas] = useState([]); 
  const [ setLoading ] = useState(true); 
  const [ setError ] = useState(null); 

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

  return { hojas, fetchHojas , setHojas }; 
};

export default useGetHojas;
