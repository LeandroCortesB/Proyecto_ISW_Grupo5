import { useState } from 'react';
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
  const [ isLoading, setIsLoading ] = useState(false);

  function hojasrut(x){
    let arreglo = []
    for(let i=0; i<hojas.length;i++){
        if(hojas[i].rut === x){
          arreglo.push(hojas[i]);
        }
    }
    return arreglo
  }
  
  let filtradas = hojasrut(rut);

  function hojasnom(x){
    let arreglo = "";
    for(let i=0; i<x.length;i++){
        arreglo=x[i].nombreCompleto;
    }
    return arreglo
  }

  let nombre = hojasnom(filtradas);

  const { handleClickAddHoja, handleCreateHoja, isPopupHojaOpen, setIsPopupHojaOpen } = useCreateHoja(setHojas);

  filtradas = filtradas.map((hoja) => ({
    ...hoja,
    anotacionTexto: hoja.buena ? 'Buena' : 'Mala',
  }));

  const columns = [
    { title: 'Numero', field: 'idHoja', width: 80, responsive: 0 },
    { title: 'Nombre', field: 'nombreCompleto', width: 250, responsive: 0 },
    { title: 'Rut', field: 'rut', width: 250, responsive: 1 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 100, responsive: 2,},
    { title: 'Descripcion', field: 'anotacion', width: 300, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
  ];

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas</h1>
          <div className="filter-actions">

            <button onClick={handleClickAddHoja}>
              <img src={Addicon} alt="add" />
            </button>

          </div>
        </div>
        <Table
          data={filtradas} 
          columns={columns}
          initialSortName="nombreCompleto"
        />
      </div>
      <PopupHoja
        show={isPopupHojaOpen}
        setShow={setIsPopupHojaOpen}
        rutSeleccionado={rut}
        nombreSeleccionado={nombre}
        action={(data) => {
          setIsLoading(true);
          handleCreateHoja(data).finally(() => setIsLoading(false));
        }}
      />
    </div>
  );
};

export default Hojas;
