import { useState, useEffect } from 'react';
import Table from '@components/Table';
import useHojas from '@hooks/hojas/useGetHojas.jsx';
import '@styles/asignatura.css';
import { useParams } from 'react-router-dom';

const Hojas = () => {
  const { rut } = useParams();
  const { hojas } = useHojas(rut);
  
  const [filteredHojas, setFilteredHojas] = useState([]);

  useEffect(() => {

    const datosFilter = hojas.filter(
      (hoja) => hoja.user.rut === rut
    );
    setFilteredHojas(datosFilter);
  }, [rut, hojas]);

  const columns = [
    { title: 'IdHoja', field: 'IdHoja', width: 300, responsive: 0 },
    { title: 'Nombre', field: 'NombreCompleto', width: 350, responsive: 0 },
    { title: 'Rut', field: 'rut', width: 200, responsive: 1 },
    { title: 'Anotacion buena', field: 'buena', width: 200, responsive: 2 },
    { title: 'Descripcion', field: 'anotacion', width: 200, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 200, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas</h1>
        </div>
        <Table
          data={filteredHojas} 
          columns={columns}
          initialSortName="nombreCompleto"
        />
      </div>
    </div>
  );
};

export default Hojas;
