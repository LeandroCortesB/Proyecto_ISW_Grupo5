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

        function hojasrut(x) {
          let arreglo = [];
          for (let i = 0; i < formattedData.length; i++) {
            if (formattedData[i].rut === x) {
              arreglo.push(formattedData[i]);
            }
          }
          return arreglo;
        }
      
        let filtradas = hojasrut(rut);

        setHojas(filtradas);
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
