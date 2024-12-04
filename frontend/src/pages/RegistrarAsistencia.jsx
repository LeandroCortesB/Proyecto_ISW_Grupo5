import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getCursos } from "@services/curso.service.js";
import { getAsignaturasByCurso } from "@services/asignatura.service.js";
import { getUsersByAsignatura } from "@services/user.service.js"; // NUEVO
import { createAsistencia } from "@services/asistencia.service.js";

const RegistrarAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [fecha, setFecha] = useState(format(new Date(), "yyyy-MM-dd"));
  const [asistencias, setAsistencias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. Cargar cursos al montar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await getCursos();
        setCursos(cursosData || []);
      } catch (err) {
        console.error("Error al cargar cursos:", err);
        setError("Error al cargar los cursos.");
      }
    };
    fetchCursos();
  }, []);

  // 2. Cargar asignaturas al seleccionar un curso
  useEffect(() => {
    if (cursoSeleccionado) {
      const fetchAsignaturas = async () => {
        try {
          const asignaturasData = await getAsignaturasByCurso(
            cursoSeleccionado
          );
          setAsignaturas(asignaturasData || []);
        } catch (err) {
          console.error("Error al cargar asignaturas:", err);
          setError("Error al cargar las asignaturas.");
        }
      };
      fetchAsignaturas();
    } else {
      setAsignaturas([]);
    }
  }, [cursoSeleccionado]);

  // 3. Cargar alumnos al seleccionar una asignatura
  useEffect(() => {
    if (asignaturaSeleccionada) {
      const fetchAlumnos = async () => {
        try {
          const alumnosData = await getUsersByAsignatura(
            asignaturaSeleccionada
          );
          setAlumnos(alumnosData || []);

          // Inicializar los estados de asistencia para los alumnos cargados
          setAsistencias(
            alumnosData.map((alumno) => ({
              idAlumno: alumno.id,
              estado: "Presente", // Estado inicial predeterminado
            }))
          );
        } catch (err) {
          console.error("Error al cargar alumnos:", err);
          setError("Error al cargar los alumnos.");
        }
      };
      fetchAlumnos();
    } else {
      setAlumnos([]);
      setAsistencias([]); // Reiniciar asistencias si no hay asignatura seleccionada
    }
  }, [asignaturaSeleccionada]);
  // Cambiar estado de asistencia de un alumno
  const handleEstadoChange = (idAlumno, nuevoEstado) => {
    setAsistencias((prevAsistencias) =>
      prevAsistencias.map((asistencia) =>
        asistencia.idAlumno === idAlumno
          ? { ...asistencia, estado: nuevoEstado }
          : asistencia
      )
    );
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!cursoSeleccionado || !asignaturaSeleccionada || !fecha) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const registro = {
        idCurso: cursoSeleccionado,
        idAsignatura: asignaturaSeleccionada,
        fecha,
        asistencias: asistencias.map((asistencia) => ({
          idAlumno: asistencia.idAlumno,
          asistio:
            asistencia.estado === "Presente" ||
            asistencia.estado === "Justificado", // Traducir a booleano
        })),
      };

      await createAsistencia(registro);
      alert("Asistencia registrada con éxito.");
      navigate("/asistencias");
    } catch (err) {
      console.error("Error al registrar asistencia:", err);
      setError("Error al registrar la asistencia.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-md shadow">
      <h1 className="text-xl font-bold mb-4">Registrar Asistencia</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fecha */}
        <div>
          <label className="block mb-2 font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Cursos */}
        <div>
          <label className="block mb-2 font-medium">Curso</label>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Selecciona un curso</option>
            {cursos.map((curso) => (
              <option
                key={curso.idCurso}
                value={curso.idCurso}
                label={curso.nombreCurso}
              >
                {curso.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Asignaturas */}
        <div>
          <label className="block mb-2 font-medium">Asignatura</label>
          <select
            value={asignaturaSeleccionada}
            onChange={(e) => setAsignaturaSeleccionada(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            disabled={!cursoSeleccionado}
          >
            <option value="">Selecciona una asignatura</option>
            {asignaturas.map((asignatura) => (
              <option
                key={asignatura.idAsignatura}
                value={asignatura.idAsignatura}
                label={asignatura.nombreAsignatura}
              >
                {asignatura.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Alumnos */}
        <div>
          <label className="block mb-2 font-medium">Alumnos</label>
          <ul className="space-y-2">
            {alumnos.map((alumno) => (
              <li key={alumno.id} className="flex items-center space-x-4">
                <span>{alumno.nombreCompleto}</span>
                <select
                  value={
                    asistencias.find((a) => a.idAlumno === alumno.id)?.estado ||
                    "Presente"
                  }
                  onChange={(e) =>
                    handleEstadoChange(alumno.id, e.target.value)
                  }
                  className="px-2 py-1 border rounded"
                >
                  <option value="Presente">Presente</option>
                  <option value="Ausente">Ausente</option>
                  <option value="Justificado">Justificado</option>
                </select>
              </li>
            ))}
          </ul>
        </div>
        {/* Botón para guardar */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded"
        >
          Guardar Asistencia
        </button>
      </form>
    </div>
  );
};

export default RegistrarAsistencia;
