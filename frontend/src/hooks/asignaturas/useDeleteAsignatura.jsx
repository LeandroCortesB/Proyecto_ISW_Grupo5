import {deleteCurso} from '@services/curso.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteCurso = (fetchCursos, setDataCurso) => {
    const handleDelete = async (dataCurso) => {
        if (dataCurso.length > 0) {
            try {
                const result = await deleteDataAlert();
                const idCurso = Number(dataCurso[0]?.idCurso);
                if (result.isConfirmed) {
                    const response = await deleteCurso(idCurso);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El curso ha sido eliminado correctamente.');
                    await fetchCursos();
                    setDataCurso([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el curso:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el curso.');
            }
        }
    };

    return {
        handleDelete
    };
};
export default useDeleteCurso;  