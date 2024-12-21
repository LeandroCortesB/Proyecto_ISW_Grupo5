import Table from '@components/Table';
import useAlumnosApoderado from '@hooks/users/useGetAlumnosApoderado.jsx';
import paperIcon from '@assets/paperIcon.svg';
import { useAuth } from '@context/AuthContext';
import { Link} from 'react-router-dom';
import '@styles/Hoja.css';
import { useCallback } from 'react';
import useEditUser from '@hooks/users/useEditUser';
import '@styles/users.css';

const Alumnos = () => {
  const { user } = useAuth();
  const { users , fetchUsers, setUsers } = useAlumnosApoderado(user.id);

  console.log("usuario ",user);
  console.log("hijos ",users);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser,
  } = useEditUser(setUsers);

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
    { title: 'Matricula', field: 'createdAt', width: 150, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Lista de mis alumnos</h1>
          <div className="filter-actions">
            <button 
            onClick={handleClickUpdate} disabled={dataUser?.length === 0 }>
            </button>

            {dataUser.length > 0 ? (
            <Link to={`/Hoja/apo/all/${dataUser[0]?.rut}`}>
                <img src={paperIcon} alt="hojas" />
            </Link>
              ) : (
            <button className="Hojas" disabled>
                  <img src={paperIcon} alt="hojas-disabled" />
            </button>
            )}
            
          </div>
        </div>
        <Table
          data={users}
          columns={columns}
          initialSortName="nombreCompleto"
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
};

export default Alumnos;
