import Table from '@components/Table';
import useAlumnos from '@hooks/users/useGetAlumnos.jsx';
import Search from '@components/Search';
import Popup from '@components/Popup';
import Popup2 from '@components/Popup2';
import DeleteIcon from '@assets/deleteIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import paperIcon from '@assets/paperIcon.svg';
import { Link} from 'react-router-dom';
import '@styles/Hoja.css';
import Addicon from '@assets/AddIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import { useCallback, useState, useEffect } from 'react';
import '@styles/users.css';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import useCreateUser from '@hooks/users/useCreateUser';

const Alumnos = () => {
  const { users , fetchUsers, setUsers } = useAlumnos();
  const [filterRut, setFilterRut] = useState('');
  const [filterAlumno, setFilterAlumnos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterNombre, setFilterNombre] = useState('');

  useEffect(() => {
    const datosFilter = users.filter((user) => 
      user.nombreCompleto?.toLowerCase().includes(filterNombre.toLowerCase())
    );
    setFilterAlumnos(datosFilter);
  }, [users, filterNombre]);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser,
  } = useEditUser(setUsers);

  const { handleClickAdd, handleCreate, isPopup2Open, setIsPopup2Open } = useCreateUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value.trim());
  };

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleSelectionChange = useCallback(
    (selectedUsers) => {
      setDataUser(selectedUsers);
    },
    [setDataUser]
  );

  const columns = [
    { title: 'Nombre', field: 'nombreCompleto', width: 360, responsive: 0 },
    { title: 'Correo electrónico', field: 'email', width: 300, responsive: 3 },
    { title: 'Rut', field: 'rut', width: 130, responsive: 2 },
    { title: 'Rol', field: 'rol', width: 150, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 150, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Lista de alumnos</h1>
          <div className="filter-actions">
            <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder='Filtrar por nombre' />
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder="Filtrar por rut" />
            <button onClick={handleClickUpdate} disabled={dataUser?.length === 0 || isLoading}>
              {dataUser?.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button
              className="delete-user-button"
              disabled={dataUser?.length === 0 || isLoading}
              onClick={() => handleDelete(dataUser)}
            >
              {dataUser?.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>

            {dataUser.length > 0 ? (
            <Link to={`/Hoja/all/${dataUser[0]?.rut}`}>
                <img src={paperIcon} alt="hojas" />
            </Link>
              ) : (
            <button className="Hojas" disabled>
                  <img src={paperIcon} alt="hojas-disabled" />
            </button>
            )}

            <button onClick={handleClickAdd}>
              <img src={Addicon} alt="add" />
            </button>
            
          </div>
        </div>
        <Table
          data={filterAlumno}
          columns={columns}
          filter={filterRut}
          dataToFilter="rut"
          initialSortName="nombreCompleto"
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataUser}
        action={(data) => {
          setIsLoading(true);
          handleUpdate(data).finally(() => setIsLoading(false));
        }}
      />
      <Popup2
        show={isPopup2Open}
        setShow={setIsPopup2Open}
        action={(data) => {
          setIsLoading(true);
          handleCreate(data).finally(() => setIsLoading(false));
        }}
      />
    </div>
  );
};

export default Alumnos;
