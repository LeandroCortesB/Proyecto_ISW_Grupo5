import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCursos } from "@services/curso.service.js";
import { getAsignaturasByCurso } from "@services/asignatura.service.js";
import { getUsersByCurso } from "@services/user.service.js";
import { createAsistencia } from "@services/asistencia.service.js";
import "@styles/registroAsistencia.css";

const RegistrarAsistencia = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [fecha, setFecha] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [asistencias, setAsistencias] = useState([]);
  const [errorCurso, setErrorCurso] = useState("");
  const [errorAsignatura, setErrorAsignatura] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [errorGeneral, setErrorGeneral] = useState(""); // Nuevo estado para errores generales
  const navigate = useNavigate();

  // Obtener lista de cursos al cargar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await getCursos();
        setCursos(cursosData || []);
      } catch (err) {
        console.error("Error al cargar cursos:", err);
      }
    };
    fetchCursos();
  }, []);

  // Actualizar asignaturas y alumnos cuando cambia el curso seleccionado
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
        }
      };

      const fetchAlumnos = async () => {
        try {
          const alumnosData = await getUsersByCurso(cursoSeleccionado);
          console.log("Alumnos obtenidos del backend:", alumnosData); // Debug
          if (!Array.isArray(alumnosData)) {
            console.error(
              "La respuesta de alumnos no es un array:",
              alumnosData
            );
            setAlumnos([]); // Limpia el estado si no es un array
            return;
          }

          // Filtra los alumnos que pertenecen al curso seleccionado
          const alumnosFiltrados = alumnosData.filter(
            (alumno) =>
              alumno.curso &&
              alumno.curso.idCurso.toString() === cursoSeleccionado
          );

          setAlumnos(alumnosFiltrados || []);
          setAsistencias(
            alumnosFiltrados.map((alumno) => ({
              idAlumno: alumno.id,
              estado: "Presente",
            }))
          );
        } catch (err) {
          console.error("Error al cargar alumnos del curso:", err);
          setAlumnos([]); // Si hay error, limpia el estado
          setAsistencias([]);
        }
      };

      fetchAsignaturas();
      fetchAlumnos();
    } else {
      setAsignaturas([]);
      setAlumnos([]);
      setAsistencias([]);
    }
  }, [cursoSeleccionado]);

  // Cambiar estado de asistencia para cada alumno
  const handleEstadoChange = (idAlumno, nuevoEstado) => {
    setAsistencias((prevAsistencias) =>
      prevAsistencias.map((asistencia) =>
        asistencia.idAlumno === idAlumno
          ? { ...asistencia, estado: nuevoEstado }
          : asistencia
      )
    );
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorCurso("");
    setErrorAsignatura("");
    setErrorFecha("");
    setErrorGeneral("");

    // Validaciones
    if (!fecha) {
      setErrorFecha("Por favor, selecciona una fecha.");
      return;
    }

    if (!cursoSeleccionado) {
      setErrorCurso("Por favor, selecciona un curso.");
      return;
    }

    if (!asignaturaSeleccionada) {
      setErrorAsignatura("Debes seleccionar una asignatura.");
      return;
    }

    try {
      const registro = {
        idCurso: cursoSeleccionado,
        idAsignatura: asignaturaSeleccionada,
        fecha,
        asistencias: asistencias.map((asistencia) => ({
          idAlumno: asistencia.idAlumno,
          asistio: asistencia.estado === "Presente",
        })),
      };

      await createAsistencia(registro);
      alert("Asistencia registrada con éxito.");
      navigate("/asistencias");
    } catch (err) {
      console.error("Error al registrar asistencia:", err);

      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Error al registrar asistencia. Inténtalo nuevamente.";
      alert(errorMessage);
    }
  };

  return (
    <div className="registro-asistencia">
      <h1 className="titulo">Registrar Asistencia</h1>
      <p className="descripcion">
        Seleccione la fecha, curso y asignatura para registrar la asistencia
      </p>
      {errorGeneral && <p className="error-message">{errorGeneral}</p>}
      <form onSubmit={handleSubmit}>
        {/* Fecha */}
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          {errorFecha && <p className="error-message">{errorFecha}</p>}
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
              <option key={curso.idCurso} value={curso.idCurso}>
                {curso.nombreCurso}
              </option>
            ))}
          </select>
          {errorCurso && <p className="error-message">{errorCurso}</p>}
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
              >
                {asignatura.nombreAsignatura}
              </option>
            ))}
          </select>
          {errorAsignatura && (
            <p className="error-message">{errorAsignatura}</p>
          )}
        </div>

        {/* Alumnos */}
        <div className="form-group">
          <label>Alumnos</label>
          <ul>
            {alumnos.map((alumno) => (
              <li key={alumno.id} className="alumno-item">
                <span className="alumno-nombre">{alumno.nombreCompleto}</span>
                <select
                  className="alumno-select"
                  value={
                    asistencias.find((a) => a.idAlumno === alumno.id)?.estado ||
                    "Presente"
                  }
                  onChange={(e) =>
                    handleEstadoChange(alumno.id, e.target.value)
                  }
                >
                  <option value="Presente">Presente</option>
                  <option value="Ausente">Ausente</option>
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para guardar */}
        <button type="submit" className="boton-guardar">
          Guardar Asistencia
        </button>
      </form>
    </div>
  );
};

export default RegistrarAsistencia;
