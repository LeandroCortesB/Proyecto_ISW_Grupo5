import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { getAsistenciasAlumno } from "@services/asistencia.service.js";
import { getAsignaturas } from "@services/asignatura.service.js";

const MisAsistencias = ({ idAlumno }) => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
  const [fechaInicio, setFechaInicio] = useState("2024-12-01");
  const [fechaFin, setFechaFin] = useState("2024-12-31");
  const [resumen, setResumen] = useState({
    clasesPresentes: 0,
    clasesAusentes: 0,
    totalClases: 0,
  });

  // Cargar asignaturas disponibles
  useEffect(() => {
    const fetchAsignaturas = async () => {
      const data = await getAsignaturas();
      setAsignaturas(data);
    };
    fetchAsignaturas();
  }, []);

  // Buscar asistencias al presionar "Buscar"
  const handleBuscar = async () => {
    if (!asignaturaSeleccionada) return alert("Selecciona una asignatura");
    const filtros = {
      asignatura: asignaturaSeleccionada,
      fechaInicio,
      fechaFin,
    };

    try {
      const data = await getAsistenciasAlumno(idAlumno, filtros);
      setResumen(data);
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
    }
  };

  // Datos para el gráfico de pastel
  const dataGrafico = {
    labels: ["Clases Presentes", "Clases Ausentes"],
    datasets: [
      {
        data: [resumen.clasesPresentes, resumen.clasesAusentes],
        backgroundColor: ["#3b82f6", "#e5e7eb"], // Azul y gris
        hoverOffset: 4,
      },
    ],
  };

  const porcentaje = resumen.totalClases
    ? Math.round((resumen.clasesPresentes / resumen.totalClases) * 100)
    : 0;

  return (
    <div className="mis-asistencias">
      <h1>Mis Asistencias</h1>
      <div className="filtros">
        <label>Asignatura:</label>
        <select
          value={asignaturaSeleccionada}
          onChange={(e) => setAsignaturaSeleccionada(e.target.value)}
        >
          <option value="">Selecciona una asignatura</option>
          {asignaturas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>

        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />

        <label>Fecha Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>

      <button onClick={handleBuscar}>Buscar</button>

      <div className="resumen">
        <h2>Resumen de Asistencias</h2>
        <p>Clases Presentes: {resumen.clasesPresentes}</p>
        <p>Clases Ausentes: {resumen.clasesAusentes}</p>
        <p>Total de Clases: {resumen.totalClases}</p>
      </div>

      <div className="grafico">
        <Pie data={dataGrafico} />
        <div className="porcentaje">
          <h3>{porcentaje}%</h3>
        </div>
      </div>
    </div>
  );
};

export default MisAsistencias;
