import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import '@styles/Hoja.css';
import {useAuth} from '@context/AuthContext.jsx';
import { useMemo } from 'react';

const MisHojas = () => {
  const { user } = useAuth();

  const rut = user.rut;
  const nombre = user.nombreCompleto;

  const { hojas, fetchHojas , setHojas } = useGetHojas(rut);
  
  let filtradas = hojas;


    const filtradasVisual = useMemo(() => {
      return [...filtradas]
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((hoja, index) => ({
          ...hoja,
          numeroOrden: index + 1,
          anotacionTexto: hoja.buena ? 'Buena' : 'Mala',
        }));
    }, [filtradas]);


  const columns = [
    { title: 'Pagina', field: 'numeroOrden', width: 100, responsive: 0 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 140, responsive: 2,},
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
          data={filtradasVisual} 
          columns={columns}
          initialSortName="nombreCompleto"
        />
      </div>
    </div>
  );
};

export default MisHojas;
