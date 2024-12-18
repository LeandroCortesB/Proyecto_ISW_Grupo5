import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useGetAsignaturas from "@hooks/asignaturas/useGetAsignaturas";
import useGetAsistenciasAlumno from "@hooks/asistencias/useGetAsistenciasAlumno";
import "@styles/asistenciaAlumno.css"; 

Chart.register(ArcElement, Tooltip, Legend);

const AsistenciaAlumno = () => {
  const { user } = useAuth();
  const { asignaturas } = useGetAsignaturas();
  const { dataAsistencias, loading, error, fetchAsistencias } =
    useGetAsistenciasAlumno();

  const [idAsignatura, setIdAsignatura] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleBuscar = () => {
    if (idAsignatura && fechaInicio && fechaFin) {
      // Formatea las fechas para enviarlas al backend
      const formattedFechaInicio = format(fechaInicio, "yyyy-MM-dd");
      const formattedFechaFin = format(fechaFin, "yyyy-MM-dd");

      console.log("Enviando datos al backend:", {
        rut: user.rut,
        fechaInicio: formattedFechaInicio,
        fechaFin: formattedFechaFin,
        idAsignatura,
      });

      fetchAsistencias(
        user.rut,
        formattedFechaInicio,
        formattedFechaFin,
        idAsignatura
      );
    } else {
      alert("Por favor, selecciona todas las opciones.");
    }
  };

  // Filtra las asignaturas según el curso del usuario
  const asignaturasFiltradas = asignaturas.filter(
    (a) => a.idCurso === user.curso?.idCurso
  );

  const chartData = dataAsistencias
    ? {
        labels: ["Presente", "Ausente"],
        datasets: [
          {
            data: [dataAsistencias.totalPresente, dataAsistencias.totalAusente],
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      }
    : null;

  return (
    <div className="asistencias-usuario-container">
      <h2>Mis Asistencias</h2>

      {/* Selector de asignaturas */}
      <div>
        <label>Asignatura:</label>
        <select
          value={idAsignatura}
          onChange={(e) => setIdAsignatura(e.target.value)}
        >
          <option value="">-- Seleccione una asignatura --</option>
          {asignaturasFiltradas.map((asignatura) => (
            <option
              key={asignatura.idAsignatura}
              value={asignatura.idAsignatura}
            >
              {asignatura.nombreAsignatura}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de fechas */}
      <div className="date-picker-container">
        <div>
          <label>Fecha Inicio:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat="dd-MM-yyyy" 
          />
        </div>
        <div>
          <label>Fecha Fin:</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            dateFormat="dd-MM-yyyy"
          />
        </div>
      </div>

      {/* Botón Buscar */}
      <button onClick={handleBuscar} disabled={loading}>
        {loading ? "Cargando..." : "Buscar"}
      </button>

      {/* Mostrar error */}
      {error && <p className="error">{error}</p>}

      {/* Resumen de asistencias */}
      {dataAsistencias && (
        <div className="stats-container">
          <div className="stats-details">
            <h3>Resumen</h3>
            <p>Total de Asistencias: {dataAsistencias.totalAsistencias}</p>
            <p>Presente: {dataAsistencias.totalPresente}</p>
            <p>Ausente: {dataAsistencias.totalAusente}</p>
            <p>Porcentaje Presente: {dataAsistencias.porcentajePresente}%</p>
            <p>Porcentaje Ausente: {dataAsistencias.porcentajeAusente}%</p>
          </div>
          {chartData && (
            <div className="chart-container">
              <Pie data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AsistenciaAlumno;
