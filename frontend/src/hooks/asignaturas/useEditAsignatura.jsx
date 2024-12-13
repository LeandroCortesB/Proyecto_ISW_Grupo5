import { useState } from 'react';
import { updateAsignatura } from '@services/asignatura.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPutEditAsignatura } from '@helpers/formatData.js';

const useEditAsignatura = (setAsignaturas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataAsignatura, setDataAsignatura] = useState([]);

    const handleClickUpdate = () => {
        if (dataAsignatura.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedAsignaturaData) => { 
        if (updatedAsignaturaData) {
            try {
                console.log('Datos de asignatura actualizados:', updatedAsignaturaData);
                const updatedAsignatura = await updateAsignatura(updatedAsignaturaData, Number(dataAsignatura[0].idAsignatura));
                console.log('Asignatura actualizada:', updatedAsignatura);
                showSuccessAlert('¡Actualizada!','La asignatura ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                const formattedAsignatura = formatPutEditAsignatura(updatedAsignatura);
                console.log('Asignatura formateada:', formattedAsignatura);

                setAsignaturas(prevAsignaturas => prevAsignaturas.map(asignatura => {
                    console.log("Asignatura actual:", asignatura);
                    if (asignatura.idAsignatura === formattedAsignatura.idAsignatura) {
                        console.log("Reemplazando con:", formattedAsignatura);
                    }
                    return asignatura.nombreAsignatura === formattedAsignatura.nombreAsignatura ? formattedAsignatura : asignatura;
                }));
                
                setDataAsignatura([]);
            } catch (error) {
                console.error('Error al actualizar la asignatura:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar la asignatura.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataAsignatura,
        setDataAsignatura
    };
}
export default useEditAsignatura;