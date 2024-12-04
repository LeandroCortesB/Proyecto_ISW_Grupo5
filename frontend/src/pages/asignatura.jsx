import { useState, useEffect } from 'react';
import Table from '@components/Table';
import useAsignaturas from '@hooks/asignaturas/useGetAsignaturas.jsx';
import '@styles/asignatura.css';
import { useParams } from 'react-router-dom';

const Asignaturas = () => {
  const { asignaturas } = useAsignaturas();
  const { idCurso } = useParams();
  const [filteredAsignaturas, setFilteredAsignaturas] = useState([]);

  useEffect(() => {
    
    const datosFilter = asignaturas.filter(
      (asignatura) => asignatura.curso.idCurso === Number(idCurso)
    );
    setFilteredAsignaturas(datosFilter);
  }, [idCurso, asignaturas]);

  const columns = [
    { title: 'Nombre', field: 'nombreAsignatura', width: 350, responsive: 0 },
    { title: 'Curso', field: 'curso.nombreCurso', width: 200, responsive: 1 },
    { title: 'Creado', field: 'createdAt', width: 200, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asignaturas</h1>
        </div>
        <Table
          data={filteredAsignaturas} 
          columns={columns}
          initialSortName="nombreAsignatura"
        />
      </div>
    </div>
  );
};

export default Asignaturas;
