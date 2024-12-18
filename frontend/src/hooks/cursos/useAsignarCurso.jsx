import { useState } from "react";
import { asignarCursoAlumno } from "@services/user.service.js";

const useAsignarCurso = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsignarCurso = async (alumnoId, idCurso) => {
    setLoading(true);
    setError(null);

    try {
      const response = await asignarCursoAlumno(alumnoId, idCurso);
      alert("Curso y asignaturas asignadas correctamente.");
      return response; // Retorna la respuesta para mayor flexibilidad
    } catch (error) {
      console.error("Error al asignar curso y asignaturas:", error);
      setError("Error al asignar curso y asignaturas.");
    } finally {
      setLoading(false);
    }
  };

  return { handleAsignarCurso, loading, error };
};

export default useAsignarCurso;
