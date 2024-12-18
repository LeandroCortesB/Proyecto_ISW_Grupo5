import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useGetAsignaturas from "@hooks/asignaturas/useGetAsignaturas";
import useGetAsistenciasAlumno from "@hooks/asistencias/useGetAsistenciasAlumno";
import "@styles/asistenciaAlumno.css"; // Importa los estilos CSS

Chart.register(ArcElement, Tooltip, Legend);

const AsistenciaAlumno = () => {
  const { user } = useAuth();
  console.log("Usuario:", user);

  const {
    asignaturas,
    loading: loadingAsignaturas,
    error: errorAsignaturas,
  } = useGetAsignaturas();
  const { dataAsistencias, loading, error, fetchAsistencias } =
    useGetAsistenciasAlumno();

  const [idAsignatura, setIdAsignatura] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleBuscar = () => {
    if (fechaInicio && fechaFin) {
      fetchAsistencias(
        user.rut,
        fechaInicio.toISOString().split("T")[0],
        fechaFin.toISOString().split("T")[0],
        idAsignatura
      );
    }
  };

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

      {/* Carga de asignaturas */}
      {loadingAsignaturas && <p className="loading">Cargando asignaturas...</p>}
      {errorAsignaturas && <p className="error">{errorAsignaturas}</p>}

      {/* Selector de asignatura y fechas */}
      <div className="date-picker-container">
        <div>
          <label>Asignatura:</label>
          <select
            value={idAsignatura}
            onChange={(e) => setIdAsignatura(e.target.value)}
          >
            <option value="">-- Seleccione una asignatura --</option>
            {asignaturas.map((asignatura) => (
              <option
                key={asignatura.idAsignatura}
                value={asignatura.idAsignatura}
              >
                {asignatura.nombreAsignatura}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha Inicio:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label>Fecha Fin:</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      <button onClick={handleBuscar} disabled={loading}>
        {loading ? "Cargando..." : "Buscar"}
      </button>

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
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AsistenciaAlumno;
