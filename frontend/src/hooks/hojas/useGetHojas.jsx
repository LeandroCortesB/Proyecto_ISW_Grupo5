import { useState, useEffect } from 'react';
import { getHojas } from '@services/hoja.service.js'; 

const useGetHojas = (rut) => {
  const [ hojas, setHojas] = useState([]); 

  const fetchHojas = async () => {
    try {
      const response = await getHojas(rut);
      const formattedData = response.map(hoja => ({
        idHoja: hoja.idHoja,
        nombreCompleto: hoja.nombreCompleto,
        rut: hoja.rut,
        buena: hoja.buena,
        anotacion: hoja.anotacion,
        createdAt: hoja.createdAt
        }));
        setHojas(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    };

  }

  useEffect(() => {
    fetchHojas(); 
  }, []);

  return { hojas, fetchHojas , setHojas }; 
};

export default useGetHojas;
