import Table from '@components/Table';
import useCursos from '@hooks/cursos/useGetCursos.jsx';
import '@styles/cursos.css';
import personIcon from '@assets/PersonIcon.svg';
import { Link} from 'react-router-dom';
import '@styles/asignatura.css';
import useDeleteCurso from '@hooks/cursos/useDeleteCurso';
import useEditCurso from '@hooks/cursos/useEditCurso';
import useCreateCurso from '@hooks/cursos/useCreateCurso';
import { useCallback, useState } from 'react';
import Search from '@components/Search';
import DeleteIcon from '@assets/deleteIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import PopupCC from '@components/PopupCC'; 
import PopupC from '@components/PopupC'; 
import AddIcon from '@assets/AddIcon.svg';




const Cursos = () => {
  const { cursos , fetchCursos , setCursos } = useCursos();
  const [filter, setFilterNombre] = useState('');
  const [setIsLoading] = useState(false);
  const columns = [
    { title: "ID", field: "idCurso", width: 150, responsive: 2 },
    { title: "Nombre", field: "nombreCurso", width: 350, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];
  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataCurso,
    setDataCurso
  } = useEditCurso(setCursos);
  const {
    handleClickAdd,
    handleCreate,
    isPopupCCOpen,
    setIsPopupCCOpen
  } = useCreateCurso(setCursos);

  const { handleDelete } = useDeleteCurso(fetchCursos, setDataCurso);

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };
  
  const handleSelectionChange = useCallback((selectedCursos) => {
    setDataCurso(selectedCursos.map(curso => ({
      ...curso,
      idCurso: Number(curso.idCurso), // Convertir idCurso a número
    })));
  }, [setDataCurso]);
  
  
  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Cursos</h1>
          <div className='filter-actions'>
            <Search value={filter} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
            <button onClick={handleClickUpdate} disabled={dataCurso.length === 0}>
              {dataCurso.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-user-button' disabled={dataCurso.length === 0} onClick={() => handleDelete(dataCurso)}>
              {dataCurso.length === 0 ? (
                <img src={DeleteIcon} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
            <button onClick={handleClickAdd}>
            <img src={AddIcon} alt="add" />
            </button>
        
            {dataCurso.length > 0 ? (
  <Link to={`/asignatura/${dataCurso[0]?.idCurso}`}>
    <img src={personIcon} alt="asignaturas" />
  </Link>
) : (
  <button className="Asignaturas" disabled>
    <img src={personIcon} alt="asignaturas-disabled" />
  </button>
)}

    
    </div>
      </div>
      <Table
          data={cursos}
          columns={columns}
          filter={filter}
          dataToFilter={'nombreCurso'}
          initialSortName={'nombreCurso'}
          onSelectionChange={handleSelectionChange}
        />
    </div>
    <PopupC show={isPopupOpen} setShow={setIsPopupOpen} data={dataCurso} action={handleUpdate} />
    <PopupCC show={isPopupCCOpen} setShow={setIsPopupCCOpen} action={(data)=>{
      setIsPopupCCOpen(true);
      handleCreate(data).finally(()=> setIsLoading(false))
    }} />
  </div>

  );
};

export default Cursos;
