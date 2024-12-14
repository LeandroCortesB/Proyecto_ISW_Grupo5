import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { format } from "date-fns";
import { getCursos } from "@services/curso.service.js";
import { getAsignaturasByCurso } from "@services/asignatura.service.js";
import { getUsersByAsignatura } from "@services/user.service.js"; // NUEVO
import { createAsistencia } from "@services/asistencia.service.js";
import "../styles/registroAsistencia.css";

const RegistrarAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [fecha, setFecha] = useState(
    () => new Date().toISOString().split("T")[0]
  ); // NUEVO
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

          setAsistencias(
            alumnosData.map((alumno) => ({
              idAlumno: alumno.id,
              estado: "Presente",
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
      setAsistencias([]);
    }
  }, [asignaturaSeleccionada]);

  const handleEstadoChange = (idAlumno, nuevoEstado) => {
    setAsistencias((prevAsistencias) =>
      prevAsistencias.map((asistencia) =>
        asistencia.idAlumno === idAlumno
          ? { ...asistencia, estado: nuevoEstado }
          : asistencia
      )
    );
  };

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
            asistencia.estado === "Presente" || asistencia.estado === "Ausente",
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
    <div className="registro-asistencia">
      <h1 className="titulo">Registrar Asistencia</h1>
      <p className="descripcion">
        Seleccione la fecha, curso y asignatura para registrar la asistencia
      </p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Fecha */}
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        {/* Cursos */}
        <div className="form-group">
          <label>Curso</label>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
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
        <div className="form-group">
          <label>Asignatura</label>
          <select
            value={asignaturaSeleccionada}
            onChange={(e) => setAsignaturaSeleccionada(e.target.value)}
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
        <div className="form-group">
          <label>Alumnos</label>
          <ul>
            {alumnos.map((alumno) => (
              <li key={alumno.id} className="alumno-item">
                <span>{alumno.nombreCompleto}</span>
                <select
                  value={
                    asistencias.find((a) => a.idAlumno === alumno.id)?.estado ||
                    "Presente"
                  }
                  onChange={(e) =>
                    handleEstadoChange(alumno.id, e.target.value)
                  }
                  className="alumno-select"
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
        <button type="submit" className="submit-button">
          Guardar Asistencia
        </button>
      </form>
    </div>
  );
};

export default RegistrarAsistencia;
