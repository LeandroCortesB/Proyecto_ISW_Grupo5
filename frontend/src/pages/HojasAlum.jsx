import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import '@styles/Hoja.css';
import { useParams } from 'react-router-dom';
import useGetAlumnosApoderado from '@hooks/users/useGetAlumnosApoderado';
import { useAuth } from '@context/AuthContext';

const Hojas = () => {
  const { rut } = useParams();
  const { user } = useAuth();
  const { hojas, fetchHojas, setHojas } = useGetHojas(rut);
  const { users } = useGetAlumnosApoderado(user.id);

  function hojasnombre(x) {
    let arreglo = '';
    for (let i = 0; i < users.length; i++) {
      if (users[i].rut === x) {
        arreglo = users[i].nombreCompleto;
      }
    }
    return arreglo;
  }

  let nombre = hojasnombre(rut);

  const columns = [
    { title: 'Pagina', field: 'numeroOrden', width: 100, responsive: 0 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 140, responsive: 2 },
    { title: 'Descripcion', field: 'anotacion', width: 700, responsive: 2 },
    { title: 'Creada', field: 'createdAt', width: 100, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas de {nombre}</h1>
          <div className="filter-actions">
          </div>
        </div>
        <Table
          data={hojas}
          columns={columns}
          initialSortName="numeroOrden"
        />
      </div>
    </div>
  );
};

export default Hojas;
