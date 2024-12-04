import Table from "@components/Table";
import useAsistencias from "@hooks/asistencias/useGetAsistencia.jsx";
import "@styles/asignatura.css";
import useDeleteAsistencia from "@hooks/asistencias/useDeleteAsistencia";
import useEditAsistencia from "@hooks/asistencias/useEditAsistencia";
import { useCallback, useState } from "react";
import Search from "@components/Search";
import DeleteIcon from "@assets/deleteIcon.svg";
import UpdateIcon from "@assets/updateIcon.svg";
import personIcon from "@assets/personIcon.svg"; // Asegúrate de que esta importación sea correcta
import UpdateIconDisable from "@assets/updateIconDisabled.svg";
import PopupA from "@components/PopupA";
import { Link } from "react-router-dom"; // Asegúrate de importar Link

const Asistencias = () => {
  const { asistencias, fetchAsistencias, setAsistencias } = useAsistencias();
  const [filter, setFilterFecha] = useState("");
  const [filterAsignatura, setFilterAsignatura] = useState(""); // Estado para filtrar por asignatura

  // Configuración de las columnas de la tabla
  const columns = [
    { title: "ID", field: "idAsistencia", width: 150, responsive: 2 },
    {
      title: "Alumno",
      field: "alumno.nombreCompleto",
      width: 350,
      responsive: 0,
    },
    {
      title: "Fecha",
      field: "fecha",
      width: 200,
      responsive: 2,
      render: (rowData) => {
        const fecha = new Date(rowData.fecha);
        return fecha.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Asistió",
      field: "asistio",
      width: 200,
      responsive: 2,
      formatter: (cell) => {
        const value = cell.getValue();
        if (value === true) return "Presente";
        if (value === false) return "Ausente";
        return "No especificado";
      },
    },
    {
      title: "Asignatura",
      field: "asignatura.nombreAsignatura",
      width: 200,
      responsive: 2,
    },
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

  const handleFechaFilterChange = (e) => {
    setFilterFecha(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedAsistencias) => {
      setDataAsistencia(
        selectedAsistencias.map((asistencia) => ({
          ...asistencia,
          idAsistencia: Number(asistencia.idAsistencia), // Convertir idAsistencia a número
        }))
      );
    },
    [setDataAsistencia]
  );

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asistencias</h1>
          <div className="filter-actions">
            {/* Filtro por asignatura */}
            <select
              value={filterAsignatura}
              onChange={(e) => setFilterAsignatura(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas las asignaturas</option>
              {[
                ...new Set(
                  asistencias.map((a) => a.asignatura?.nombreAsignatura || "")
                ),
              ].map((asignatura, index) => (
                <option key={index} value={asignatura}>
                  {asignatura}
                </option>
              ))}
            </select>
            {/* Filtro por fecha */}
            <Search
              value={filter}
              onChange={handleFechaFilterChange}
              placeholder={"Filtrar por fecha"}
            />
            <div className="action-buttons">
              <button
                onClick={handleClickUpdate}
                disabled={dataAsistencia.length === 0}
              >
                {dataAsistencia.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button>
              <button
                className="delete-user-button"
                disabled={dataAsistencia.length === 0}
                onClick={() => handleDelete(dataAsistencia)}
              >
                {dataAsistencia.length === 0 ? (
                  <img src={DeleteIcon} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button>
              <Link to="/asistencias/registrar">
                <button className="icon-button">
                  <img src={personIcon} alt="Registrar Asistencia" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Table
          data={asistencias}
          columns={columns}
          filter={filter}
          dataToFilter={["fecha"]}
          initialSortName="fecha"
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <PopupA
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataAsistencia}
        action={handleUpdate}
      />
    </div>
  );
};

export default Asistencias;
