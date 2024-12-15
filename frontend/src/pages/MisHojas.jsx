import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import '@styles/Hoja.css';
import {useAuth} from '@context/AuthContext.jsx';

const MisHojas = () => {
  const { user } = useAuth();

  const rut = user.rut;
  const nombre = user.nombreCompleto;

  const { hojas, fetchHojas , setHojas } = useGetHojas(rut);

  console.log("rut yut:",hojas);
  
  let filtradas = hojas;

  filtradas = filtradas.map((hoja) => ({
    ...hoja,
    anotacionTexto: hoja.buena ? 'Buena' : 'Mala',
  }));

  const columns = [
    { title: 'Numero', field: 'idHoja', width: 150, responsive: 0 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 150, responsive: 2,},
    { title: 'Descripcion', field: 'anotacion', width: 700, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
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
          data={filtradas} 
          columns={columns}
          initialSortName="nombreCompleto"
        />
      </div>
    </div>
  );
};

export default MisHojas;
