import { useCallback, useState } from 'react';
import Table from '@components/Table';
import useGetHojas from '@hooks/hojas/useGetHojas.jsx';
import PopupHoja from '@components/PopupHoja';
import PopupUHoja from '@components/PopupUHoja';
import '@styles/Hoja.css';
import { useParams } from 'react-router-dom';
import useCreateHoja from '@hooks/hojas/useCreateHoja.jsx';
import Addicon from '@assets/AddIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import DeleteIcon from '@assets/deleteIcon.svg';
import DeleteIconDisable from '@assets/deleteIconDisabled.svg';
import useEditHoja from '@hooks/hojas/useEditHoja';
import useDeleteHoja from '@hooks/hojas/useDeleteHoja';
import useGetAlumnos from '@hooks/users/useGetAlumnos';

const Hojas = () => {
  const { rut } = useParams();
  const { hojas, fetchHojas, setHojas } = useGetHojas(rut);
  const [ isLoading, setIsLoading] = useState(false);
  const { users } = useGetAlumnos();

  const {
    handleClickUpdateH,
    handleUpdateH,
    isPopupHOpen,
    setIsPopupHOpen,
    dataHoja,
    setDataHoja,
  } = useEditHoja(setHojas);

  const { handleDelete } = useDeleteHoja(fetchHojas, setDataHoja);

  const { handleClickAddHoja, handleCreateHoja, isPopupHojaOpen, setIsPopupHojaOpen } =
  useCreateHoja(setHojas);

  let filtradas = hojas;

  function hojasnombre(x) {
    let arreglo = '';
    for (let i = 0; i < users.length; i++) {
      if (users[i].rut === x) {
        arreglo = users[i].nombreCompleto;
      }
    }
    return arreglo;
  }

  let nombre = hojasnombre(rut);

  filtradas = filtradas
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) 
    .map((hoja, index) => ({
      ...hoja,
      numeroOrden: index + 1, 
      anotacionTexto: hoja.buena ? 'Buena' : 'Mala',
    }));

  const columns = [
    { title: 'Numero', field: 'numeroOrden', width: 100, responsive: 0 },
    { title: 'Anotacion', field: 'anotacionTexto', width: 140, responsive: 2 },
    { title: 'Descripcion', field: 'anotacion', width: 700, responsive: 2 },
    { title: 'Creado', field: 'createdAt', width: 100, responsive: 2 },
  ];

  const handleSelectionChange = useCallback(
    (selectedHojas) => {
      setDataHoja(selectedHojas);
    },
    [setDataHoja]
  );

  return (
    <div className="main-container">
      <div className="table-container">
        <div className="top-table">
          <h1 className="title-table">Hojas de {nombre}</h1>
          <div className="filter-actions">
            <button onClick={handleClickUpdateH} disabled={dataHoja?.length === 0 || isLoading}>
              {dataHoja?.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>

            <button onClick={handleClickAddHoja}>
              <img src={Addicon} alt="add" />
            </button>

            <button
              className="delete-hoja-button"
              disabled={dataHoja.length === 0|| isLoading}
              onClick={() => handleDelete(dataHoja)}
            >
              {dataHoja.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={filtradas}
          columns={columns}
          initialSortName="numeroOrden"
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
      <PopupUHoja
        show={isPopupHOpen}
        setShow={setIsPopupHOpen}
        data={dataHoja}
        action={(data) => {
          setIsLoading(true);
          handleUpdateH(data).finally(() => setIsLoading(false));
      }}
      />
    </div>
  );
};

export default Hojas;
