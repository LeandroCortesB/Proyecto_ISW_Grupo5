import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from "react-chartjs-2";
import useGetAsignaturas from "@hooks/asignaturas/useGetAsignaturas";
import useGetAsistenciasAlumno from "@hooks/asistencias/useGetAsistenciasAlumno"; // Importa el hook

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
    fetchAsistencias(
      user.rut,
      fechaInicio.toISOString().split("T")[0],
      fechaFin.toISOString().split("T")[0],
      idAsignatura
    );
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

      {loadingAsignaturas && <p>Cargando asignaturas...</p>}
      {errorAsignaturas && <p className="error">{errorAsignaturas}</p>}

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
        <label>Fecha Fin:</label>
        <DatePicker
          selected={fechaFin}
          onChange={(date) => setFechaFin(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <button onClick={handleBuscar} disabled={loading}>
        {loading ? "Cargando..." : "Buscar"}
      </button>

      {error && <p className="error">{error}</p>}

      {dataAsistencias && (
        <div>
          <h3>Resumen</h3>
          <p>Total de Asistencias: {dataAsistencias.totalAsistencias}</p>
          <p>Presente: {dataAsistencias.totalPresente}</p>
          <p>Ausente: {dataAsistencias.totalAusente}</p>
          <p>Porcentaje Presente: {dataAsistencias.porcentajePresente}%</p>
          <p>Porcentaje Ausente: {dataAsistencias.porcentajeAusente}%</p>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default AsistenciaAlumno;
