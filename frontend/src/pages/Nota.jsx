import { useCallback, useState } from 'react';
import Table from '@components/Table';
import useNotas from '@hooks/nota/useGetNotas';
import useEditNota from '@hooks/nota/useEditNota';
import useDeleteNota from '@hooks/nota/useDeleteNota';
import DeleteIcon from '@assets/deleteIcon.svg';
import UpdateIcon from '@assets/updateIcon.svg';
import UpdateIconDisable from '@assets/updateIconDisabled.svg';
import Search from '@components/Search';
import PopupN from '@components/PopupN';

const Notas = () => {
    const { notas, fetchNotas } = useNotas();
    const [filter, setFilterNombre] = useState(""); 
    const [notasLocal, setNotas] = useState([]); 

    const columns = [
        { title: "Nota", field: "calificacion", width: 150, responsive: 2 },
        { title: "Asignatura", field: "asignatura.nombreAsignatura", width: 200, responsive: 0 },
        { title: "Nombre", field: "alumno.nombreCompleto", width: 200, responsive: 2 },
        { title: "Creado", field: "createdAt", width: 200, responsive: 2 },

    ];
    notasLocal
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataNota,
        setDataNota
    } = useEditNota(setNotas); 

    const { handleDelete } = useDeleteNota(fetchNotas, setDataNota);
    const handleNombreFilterChange = (e) => {
        setFilterNombre(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedNotas) => {
        setDataNota(selectedNotas.map(nota => ({
            ...nota,
            idNota: Number(nota.idNota), // Convertir idNota a número
        })));
    }, [setDataNota]);

    return (
        <div className="main-container">
            <div className="table-container">
                <div className="top-table">
                    <h1 className="title-table">Notas</h1>
                    <div className="filter-actions">
                        <Search value={filter} onChange={handleNombreFilterChange} placeholder={'Filtrar por nombre'} />
                        <button onClick={handleClickUpdate} disabled={dataNota.length === 0}>
                            {dataNota.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className="delete-user-button" disabled={dataNota.length === 0} onClick={() => handleDelete(dataNota)}>
                            {dataNota.length === 0 ? (
                                <img src={DeleteIcon} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={notas}
                    columns={columns}
                    filter={filter}
                    dataToFilter={'alumno.nombreCompleto'}
                    initialSortName={'alumno.nombreCompleto'}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupN show={isPopupOpen} setShow={setIsPopupOpen} data={dataNota} action={handleUpdate} />
        </div>
    );
}

export default Notas;