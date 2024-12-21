import { useState, useEffect, useCallback } from "react";
import { getAsistencias } from "@services/asistencia.service.js";

const useGetAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAsistencias = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAsistencias();
      setAsistencias(response); 
    } catch (err) {
      console.error("Error fetching asistencias: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchAsistencias();
  }, [fetchAsistencias]);

  return { asistencias, loading, error, fetchAsistencias, setAsistencias };
};

export default useGetAsistencias;
