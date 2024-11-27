import Table from '@components/Table';
import useAsignaturas from '@hooks/asignaturas/useGetAsignaturas.jsx';
import '@styles/asignatura.css';



const Asignaturas = () => {
  const { asignaturas } = useAsignaturas();
  console.log(asignaturas);
  const columns = [
    { title: "Nombre", field: "nombreAsignatura", width: 350, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 },
  ];
  return(
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Asignaturas</h1>
        </div>
        <Table
          data={asignaturas}
          columns={columns}
          initialSortName={'nombreAsignatura'}
        />
      </div>
    </div>
  );
}
export default Asignaturas;