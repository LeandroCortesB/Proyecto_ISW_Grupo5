import { useState } from 'react';
import Table from '@components/Table'; 
import useAsignaturas from '@hooks/asignaturas/useGetAsignaturas.jsx';
import '@styles/asignatura.css';

const Asignaturas = () => { 
  const { asignaturas } = useAsignaturas(); // Datos de las asignaturas
  const [selectedAsignatura, setSelectedAsignatura] = useState(null); // Asignatura seleccionada

  // Imprime los datos de asignaturas para asegurarnos que los datos estén correctos
  console.log(asignaturas);

  // Función para manejar el click en "Registrar Asistencia"
  const handleRegistrarAsistencia = (idAsignatura) => {
    console.log(`Registrar asistencia para la asignatura con ID: ${idAsignatura}`);
    setSelectedAsignatura(idAsignatura); // Al hacer clic, se guarda la asignatura seleccionada
  };

  // Asegúrate de que los datos de asignaturas tengan el campo 'idAsignatura'
  const columns = [
    { title: "Nombre", field: "nombreAsignatura", width: 350, responsive: 0 },
    { title: "Curso", field: "curso.nombreCurso", width: 200, responsive: 1 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
    {
      title: "Registrar Asistencia",
      field: "registrarAsistencia", // El campo que no tiene nombre
      width: 200,
      responsive: 3,
      render: (rowData) => (
        <button onClick={() => handleRegistrarAsistencia(rowData.idAsignatura)}>
          Registrar Asistencia
        </button>
      ),
    },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Asignaturas</h1>
        </div>
        {/* Muestra un mensaje si no hay asignaturas */}
        {asignaturas.length === 0 ? (
          <p>No hay asignaturas disponibles</p>
        ) : (
          <Table
            data={asignaturas}
            columns={columns}
            initialSortName={"nombreAsignatura"}
          />
        )}
      </div>

      {/* Aquí mostrarías la asignatura seleccionada (solo para probar) */}
      {selectedAsignatura && <p>Seleccionaste la asignatura con ID: {selectedAsignatura}</p>}
    </div>
  );
};

export default Asignaturas;
