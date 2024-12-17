import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '@components/Search';
import Popup from '@components/Popup';
import DeleteIcon from '@assets/deleteIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import { useCallback, useState, useEffect} from 'react';
import '@styles/users.css';
import Addicon from '@assets/AddIcon.svg';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import useCreateUser from '@hooks/users/useCreateUser';
import PopupUser from '@components/PopupUser';

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');
  const [filterUser, setFilterUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterNombre, setFilterNombre] = useState('');

  useEffect(() => {
    const datosFilter = users.filter((user) => 
      user.nombreCompleto?.toLowerCase().includes(filterNombre.toLowerCase())
    );
    setFilterUsers(datosFilter);
  }, [users, filterNombre]);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const { handleClickAdd, handleCreate, isPopup2Open, setIsPopup2Open } = useCreateUser(setUsers);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleNombreFilterChange = (e) => {
    setFilterNombre(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const columns = [
    { title: "Nombre", field: "nombreCompleto", width: 350, responsive: 0 },
    { title: "Correo electrónico", field: "email", width: 300, responsive: 3 },
    { title: "Rut", field: "rut", width: 150, responsive: 2 },
    { title: "Rol", field: "rol", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Usuarios</h1>
          <div className='filter-actions'>
            <Search value={filterNombre} onChange={handleNombreFilterChange} placeholder='Filtrar por nombre' />
            <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} />
            <button onClick={handleClickUpdate} disabled={dataUser.length === 0}>
              {dataUser.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-user-button' disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
              {dataUser.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>

            <button onClick={handleClickAdd}>
              <img src={Addicon} alt="add" />
            </button>

          </div>
        </div>
        <Table
          data={filterUser}
          columns={columns}
          filter={filterRut}
          dataToFilter={'rut'}
          initialSortName={'nombreCompleto'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
      <PopupUser
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

export default Users;