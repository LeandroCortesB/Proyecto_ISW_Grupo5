import { useCallback, useState } from 'react';
import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import PopupHoja from '@components/PopupHoja';
import '@styles/Hoja.css';
import { useParams } from 'react-router-dom';
import useCreateHoja from '@hooks/hojas/useCreateHoja.jsx';
import Addicon from '@assets/AddIcon.svg';
import DeleteIcon from '@assets/deleteIcon.svg';
import useEditHoja from '@hooks/hojas/useEditHoja';
import useDeleteHoja from '@hooks/hojas/useDeleteHoja';

const Hojas = () => {
  const { rut } = useParams();
  const { hojas, fetchHojas , setHojas } = useGetHojas(rut);
  const [ isLoading, setIsLoading ] = useState(false);

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataHoja,
    setDataHoja
} = useEditHoja(setHojas); 

const { handleDelete } = useDeleteHoja(fetchHojas, setDataHoja);

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
    { title: 'Numero', field: 'idHoja', width: 150, responsive: 0 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 150, responsive: 2,},
    { title: 'Descripcion', field: 'anotacion', width: 700, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
  ];

  const handleSelectionChange = useCallback((selectedHojas) => {
    setDataHoja(selectedHojas.map(hoja => ({
        ...hoja,
        idHoja: (hoja.idHoja), 
    })));
}, [setDataHoja]);


  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas de {nombre}</h1>
          <div className="filter-actions">

            <button onClick={handleClickAddHoja}>
              <img src={Addicon} alt="add" />
            </button>

            <button className="delete-user-button" disabled={dataHoja.length === 0} onClick={() => handleDelete(dataHoja)}>
              {dataHoja.length === 0 ? (
                  <img src={DeleteIcon} alt="delete-disabled" />
                    ) : (
                  <img src={DeleteIcon} alt="delete" />
              )}
            </button>

          </div>
        </div>
        <Table
          data={filtradas} 
          columns={columns}
          initialSortName="nombreCompleto"
          onSelectionChange={handleSelectionChange}
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
