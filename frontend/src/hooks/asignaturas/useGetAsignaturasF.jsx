import { useState, useEffect } from "react";
import { getAsignaturas } from "@services/asignatura.service.js";

const useGetAsignaturas = (idCurso) => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAsignaturas = async () => {
    try {
      setLoading(true);
      const response = await getAsignaturas(); // Trae todas las asignaturas
      const asignaturasFiltradas = response.filter(
        (asignatura) => asignatura.idCurso === idCurso // Filtra por cursoId
      );
      setAsignaturas(asignaturasFiltradas);
    } catch (err) {
      console.error("Error al obtener asignaturas:", err);
      setError("Error al cargar asignaturas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idCurso) {
      fetchAsignaturas();
    }
  }, [idCurso]);

  return { asignaturas, loading, error };
};

export default useGetAsignaturas;
