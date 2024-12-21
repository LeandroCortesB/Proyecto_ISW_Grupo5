import { deleteHoja } from '@services/hoja.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteHoja = (fetchHojas, setDataHoja) => {
    const handleDelete = async (dataHoja) => {
        if (dataHoja.length > 0) {
            try {
                const result = await deleteDataAlert();
                const idHoja = Number(dataHoja[0]?.idHoja);
            if (result.isConfirmed) {
                const response = await deleteHoja(idHoja);
                if(response.status === 'Client error') {
                    return showErrorAlert('Error', response.details);
                }
                showSuccessAlert('¡Eliminado!','La hoja ha sido eliminada correctamente.');
                await fetchHojas();
                setDataHoja([]);
            } else {
                showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
            }
            } catch (error) {
                console.error('Error al eliminar la hoja:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la hoja.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteHoja;