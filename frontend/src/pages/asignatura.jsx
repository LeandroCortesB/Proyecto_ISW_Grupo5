import { useState } from "react";
import Table from "@components/Table";
import Search from "@components/Search";
import useAsignaturas from "@hooks/asignaturas/useGetAsignaturas.jsx";
import "@styles/asignatura.css";
import { useParams } from "react-router-dom";
import useEditAsignatura from "@hooks/asignaturas/useEditAsignatura";
import useDeleteAsignatura from "@hooks/asignaturas/useDeleteAsignatura";
import useCreateAsignatura from "@hooks/asignaturas/useCreateAsignatura";
import AddIcon from "@assets/AddIcon.svg";
import DeleteIcon from "@assets/deleteIcon.svg";
import UpdateIcon from "@assets/updateIcon.svg";
import PopupCA from "@components/PopupCA";
import PopupEA from "@components/PopupEA";
import { useMemo } from "react";


const Asignaturas = () => {
  const { idCurso } = useParams();
  const [filterNombre, setFilterNombre] = useState("");
  const {asignaturas , fetchAsignatura, setAsignaturas} = useAsignaturas();
  const [isLoading, setIsLoading] = useState(false);


  const filteredAsignaturas = useMemo(() => {
    return asignaturas.filter(
      (asignatura) =>
        asignatura.idCurso === Number(idCurso) &&
        asignatura.nombreAsignatura.toLowerCase().includes(filterNombre.toLowerCase())  
    );
  }, [idCurso, asignaturas, filterNombre ]);

  const columns = [
    { title: "ID", field: "idAsignatura", width: 100, responsive: 3 },
    { title: "Nombre", field: "nombreAsignatura", width: 350, responsive: 0 },
    { title: "Curso", field: "curso.nombreCurso", width: 200, responsive: 1 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
  ];
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAsignatura,
    setDataAsignatura
  } = useEditAsignatura(setAsignaturas);
  const {
    handleClickAddAsignatura,
        handleCreateAsignatura,
        isPopupAsignaturaOpen,
        setIsPopupAsignaturaOpen
  } = useCreateAsignatura(setAsignaturas);

  const { handleDelete } = useDeleteAsignatura(fetchAsignatura, setDataAsignatura);

  const handleSelectionChange = (selectedAsignaturas) => {
    setDataAsignatura(selectedAsignaturas.map(asignatura => ({
      ...asignatura,
      idAsignatura: Number(asignatura.idAsignatura), // Convertir idAsignatura a número
    })));
  };
  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asignaturas</h1>
          <div className="filter-actions">
            <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
          <button className="add-button" onClick={handleClickAddAsignatura}>
              <img src={AddIcon} alt="add" />
            </button>
            <button onClick={handleClickUpdate} disabled={dataAsignatura.length === 0}>
              {dataAsignatura.length === 0 ? (
                <img src={UpdateIcon} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className="delete-button" disabled={dataAsignatura.length === 0} onClick={() => handleDelete(dataAsignatura)}>
              {dataAsignatura.length === 0 ? (
                <img src={DeleteIcon} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={filteredAsignaturas}
          columns={columns}
          initialSortName="nombreAsignatura"
          onSelectionChange={handleSelectionChange}
          dataToFilter="nombreAsignatura"
          
        />
      </div>
      <PopupEA show={isPopupOpen} setShow={setIsPopupOpen} data={dataAsignatura} action={handleUpdate} />
      <PopupCA show={isPopupAsignaturaOpen} setShow={setIsPopupAsignaturaOpen} action={(data)=>{
        handleCreateAsignatura(data).finally(()=>setIsPopupAsignaturaOpen(false));
        setIsLoading(true);
      }} idCurso={idCurso}  />
    </div>
  );
};

export default Asignaturas;
