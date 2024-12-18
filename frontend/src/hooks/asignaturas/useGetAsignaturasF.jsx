import { useState, useEffect } from "react";
import { getAsignaturas } from "@services/asignatura.service.js";
import { useAuth } from "@context/AuthContext"; // Importa el contexto de autenticación

const useGetAsignaturasFiltradas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Obtener el usuario y su idCurso

  const fetchAsignaturas = async () => {
    try {
      setLoading(true);
      console.log("Filtrando asignaturas por idCurso:", user.idCurso);

      // Verifica que idCurso no sea null o undefined
      if (!user?.idCurso) {
        throw new Error("El curso del usuario no está definido.");
      }

      // Llama a la API para obtener las asignaturas
      const response = await getAsignaturas();
      console.log("Respuesta completa de asignaturas:", response);

      // Filtra asignaturas por el idCurso del usuario
      const filteredAsignaturas = response
        .filter((asignatura) => asignatura.idCurso === user.idCurso)
        .map((asignatura) => ({
          nombreAsignatura: asignatura.nombreAsignatura,
          idAsignatura: asignatura.idAsignatura,
          idCurso: asignatura.idCurso,
          createdAt: asignatura.createdAt,
        }));

      setAsignaturas(filteredAsignaturas);
      console.log("Asignaturas filtradas:", filteredAsignaturas);
    } catch (err) {
      console.error("Error al obtener asignaturas filtradas:", err.message);
      setError("Error al cargar las asignaturas. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignaturas();
  }, [user?.idCurso]); // Se ejecuta cuando cambia el idCurso

  return { asignaturas, loading, error, fetchAsignaturas };
};

export default useGetAsignaturasFiltradas;
