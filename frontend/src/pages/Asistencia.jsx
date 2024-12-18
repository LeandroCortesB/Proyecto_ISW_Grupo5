import Table from "@components/Table";
import useAsistencias from "@hooks/asistencias/useGetAsistencia.jsx";
//import "@styles/asignatura.css";
import "@styles/asistencia.css";
import "@styles/tablaAsistencia.css";
import "@styles/customFiltroCalendario.css";
import useDeleteAsistencia from "@hooks/asistencias/useDeleteAsistencia";
import useEditAsistencia from "@hooks/asistencias/useEditAsistencia";
import { useCallback, useState, useEffect } from "react";
import DeleteIcon from "@assets/deleteIcon.svg";
import UpdateIcon from "@assets/updateIcon.svg";
import personIcon from "@assets/PersonIcon.svg";
import UpdateIconDisable from "@assets/updateIconDisabled.svg";
import PopupA from "@components/PopupA";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Español
import { format, parse } from "date-fns";

registerLocale("es", es);
setDefaultLocale("es");

const Asistencias = () => {
  const { asistencias, fetchAsistencias, setAsistencias } = useAsistencias();
  const [filterAlumno, setFilterAlumno] = useState(""); // Filtro por alumno
  const [filterDate, setFilterDate] = useState(null); // Filtro por fecha
  const [filterAsignatura, setFilterAsignatura] = useState(""); // Filtro por asignatura
  const [filteredAsistencias, setFilteredAsistencias] = useState([]); // Datos filtrados
  const [selectedRows, setSelectedRows] = useState([]); // Filas seleccionadas

  const columns = [
    { title: "N° Asistencia", field: "idAsistencia", width: 150 },
    { title: "Alumno", field: "alumno.nombreCompleto", width: 350 },
    {
      title: "Fecha",
      field: "fecha",
      width: 200,
      formatter: (cell) => {
        const value = cell.getValue();
        if (!value) return "Fecha inválida";
        const fecha = parse(value, "yyyy-MM-dd", new Date());
        return format(fecha, "dd-MM-yyyy");
      },
    },
    {
      title: "Estado",
      field: "asistio",
      width: 200,
      formatter: (cell) => (cell.getValue() ? "Presente" : "Ausente"),
    },
    { title: "Asignatura", field: "asignatura.nombreAsignatura", width: 200 },
  ];

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAsistencia,
    setDataAsistencia,
  } = useEditAsistencia(setAsistencias, fetchAsistencias);

  const { handleDelete } = useDeleteAsistencia(
    fetchAsistencias,
    setDataAsistencia
  );

  // Filtros combinados
  useEffect(() => {
    const normalizeDate = (date) => {
      if (!date) return null;
      const normalized = new Date(date);
      // Elimina el desfase local al UTC
      normalized.setMinutes(
        normalized.getMinutes() - normalized.getTimezoneOffset()
      );
      normalized.setHours(0, 0, 0, 0);
      return normalized;
    };
    const filtered = asistencias.filter((asistencia) => {
      const matchesAlumno = filterAlumno
        ? asistencia.alumno.nombreCompleto === filterAlumno
        : true;

      const matchesDate = filterDate
        ? normalizeDate(asistencia.fecha).toISOString().split("T")[0] ===
          normalizeDate(filterDate).toISOString().split("T")[0]
        : true;

      const matchesAsignatura = filterAsignatura
        ? asistencia.asignatura.nombreAsignatura === filterAsignatura
        : true;

      return matchesAlumno && matchesDate && matchesAsignatura;
    });

    setFilteredAsistencias(filtered);
  }, [filterAlumno, filterDate, filterAsignatura, asistencias]);

  useEffect(() => {
    const visibleSelectedRows = selectedRows.filter((selectedRow) =>
      filteredAsistencias.some(
        (asistencia) => asistencia.idAsistencia === selectedRow.idAsistencia
      )
    );
    setSelectedRows(visibleSelectedRows);
  }, [filteredAsistencias]);

  const handleSelectionChange = useCallback(
    (selectedAsistencias) => {
      setSelectedRows(selectedAsistencias);
      setDataAsistencia(selectedAsistencias);
    },
    [setDataAsistencia]
  );

  return (
    <div className="asistencia-page">
      <div className="main-container">
        <div className="table-container">
          {/* Título de la tabla */}
          <h1 className="title-table">Tabla de Registro de Asistencias</h1>

          {/* Filtros y botones */}
          <div className="filter-and-buttons">
            {/* Contenedor para los filtros alineados a la izquierda */}
            <div className="filters">
              <select
                value={filterAlumno}
                onChange={(e) => setFilterAlumno(e.target.value)}
                className="filter-select"
              >
                <option value="">Todos los alumnos</option>
                {[
                  ...new Set(asistencias.map((a) => a.alumno.nombreCompleto)),
                ].map((alumno, index) => (
                  <option key={index} value={alumno}>
                    {alumno}
                  </option>
                ))}
              </select>

              <DatePicker
                selected={filterDate}
                onChange={(date) => setFilterDate(date)}
                dateFormat="dd-MM-yyyy"
                locale="es"
                placeholderText="Filtrar por fecha"
                isClearable
                className="filter-date-picker"
              />

              <select
                value={filterAsignatura}
                onChange={(e) => setFilterAsignatura(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas las asignaturas</option>
                {[
                  ...new Set(
                    asistencias.map((a) => a.asignatura.nombreAsignatura)
                  ),
                ].map((asignatura, index) => (
                  <option key={index} value={asignatura}>
                    {asignatura}
                  </option>
                ))}
              </select>
            </div>

            {/* Contenedor para los botones alineados a la derecha */}
            <div className="buttons">
              <button
                onClick={handleClickUpdate}
                disabled={selectedRows.length === 0}
                className="icon-button"
              >
                <img
                  src={
                    selectedRows.length === 0 ? UpdateIconDisable : UpdateIcon
                  }
                  alt="edit"
                />
              </button>
              <button
                className="delete-user-button"
                disabled={selectedRows.length === 0}
                onClick={() => handleDelete(selectedRows)}
              >
                <img src={DeleteIcon} alt="delete" />
              </button>
              <Link to="/asistencias/registrar">
                <button className="register-button">
                  <img src={personIcon} alt="Registrar Asistencia" />
                  <span>Registrar Asistencia</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Tabla de asistencias */}
          {filteredAsistencias.length > 0 ? (
            <Table
              data={filteredAsistencias}
              columns={columns}
              selectable={true}
              selectedRowKeys={selectedRows.map((row) => row.idAsistencia)}
              onSelectionChange={handleSelectionChange}
            />
          ) : (
            <div>No hay asistencias registradas.</div>
          )}

          {/* Popup para edición */}
          <PopupA
            show={isPopupOpen}
            setShow={setIsPopupOpen}
            data={dataAsistencia}
            action={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Asistencias;
