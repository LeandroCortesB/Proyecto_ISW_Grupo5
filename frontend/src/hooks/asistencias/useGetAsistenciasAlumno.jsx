import { useState } from "react";
import { getAsistenciasByAlumno } from "@services/asistencia.service";

const useAsistenciasAlumno = () => {
  const [dataAsistencias, setDataAsistencias] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAsistencias = async (rut, fechaInicio, fechaFin, idAsignatura) => {
    if (!rut || !fechaInicio || !fechaFin || !idAsignatura) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const data = await getAsistenciasByAlumno(
        rut,
        fechaInicio,
        fechaFin,
        idAsignatura
      );
      setDataAsistencias(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar asistencias:", err);
      setError("Error al cargar asistencias.");
    } finally {
      setLoading(false);
    }
  };

  return {
    dataAsistencias,
    loading,
    error,
    fetchAsistencias,
  };
};

export default useAsistenciasAlumno;
