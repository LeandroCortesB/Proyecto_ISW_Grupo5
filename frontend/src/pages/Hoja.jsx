import { useState, useEffect } from 'react';
import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import PopupHoja from '@components/PopupHoja';
import '@styles/Hoja.css';
import { useParams } from 'react-router-dom';
import useCreateHoja from '@hooks/hojas/useCreateHoja.jsx';
import Addicon from '@assets/AddIcon.svg';

const Hojas = () => {
  const { rut } = useParams();
  const { hojas, fetchHojas , setHojas } = useGetHojas(rut);
  const [filteredHojas, setFilteredHojas] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {

    const datosFilter = hojas.filter(
      (hoja) => hoja.user.rut === (rut)
    );
    setFilteredHojas(datosFilter);
  }, [rut, hojas]);

  const { handleClickAdd, handleCreate, isPopupHojaOpen, setIsPopupHojaOpen } = useCreateHoja(setHojas);

  const columns = [
    { title: 'IdHoja', field: 'IdHoja', width: 80, responsive: 0 },
    { title: 'Nombre', field: 'NombreCompleto', width: 250, responsive: 0 },
    { title: 'Rut', field: 'rut', width: 250, responsive: 1 },
    { title: 'Anotacion buena', field: 'buena', width: 100, responsive: 2 },
    { title: 'Descripcion', field: 'anotacion', width: 300, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas</h1>
          <div className="filter-actions">

            <button onClick={handleClickAdd}>
              <img src={Addicon} alt="add" />
            </button>

          </div>
        </div>
        <Table
          data={filteredHojas} 
          columns={columns}
          initialSortName="nombreCompleto"
        />
      </div>
      <PopupHoja
        show={isPopupHojaOpen}
        setShow={setIsPopupHojaOpen}
        rutSeleccionado={rut}
        action={(data) => {
          setIsLoading(true);
          handleCreate(data).finally(() => setIsLoading(false));
        }}
      />
    </div>
  );
};

export default Hojas;
