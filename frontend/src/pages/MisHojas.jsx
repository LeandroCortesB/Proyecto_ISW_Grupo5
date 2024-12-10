import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import '@styles/Hoja.css';
import {useAuth} from '@context/AuthContext.jsx';

const MisHojas = () => {
  const { user } = useAuth();

  const rut = user.rut;
  const nombre = user.nombreCompleto;

  const { hojas, fetchHojas , setHojas } = useGetHojas(rut);

  function hojasrut(x){
    let arreglo = []
    for(let i=0; i<hojas.length;i++){
        if(hojas[i].rut === x){
          arreglo.push(hojas[i]);
        }
    }
    for(let i=0; i<arreglo.length;i++){
      arreglo[i].idHoja = i+1;
    }
    return arreglo
  }
  
  let filtradas = hojasrut(rut);

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
