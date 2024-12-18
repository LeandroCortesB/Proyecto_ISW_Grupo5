import {deleteNota} from '@services/nota.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteNota = (fetchNotas, setDataNota) => {
    const handleDelete = async (dataNota) => {
        console.log("dataNota", dataNota);
        if (dataNota.length > 0) {
            try {
                const result = await deleteDataAlert();
                const idNota = Number(dataNota[0]);
                if (result.isConfirmed) {
                    const response = await deleteNota(idNota);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La nota ha sido eliminada correctamente.');
                    await fetchNotas();
                    setDataNota([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la nota:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la nota.');
            }
        }
    };

    return {
        handleDelete
    };
}

export default useDeleteNota;