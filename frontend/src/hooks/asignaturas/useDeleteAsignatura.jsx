import {deleteAsignatura} from '@services/asignatura.service.js';
import {deleteDataAlert , showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeleteAsignatura = (fetchAsignaturas, setDataAsignatura) => {
    const handleDelete = async (dataAsignatura) => {
        if (dataAsignatura.length > 0) {
            try {
                console.log('Datos de asignatura a eliminar:', dataAsignatura);
                const result = await deleteDataAlert();
                const idAsignatura = Number(dataAsignatura[0]?.idAsignatura);
                if (result.isConfirmed) {
                    const response = await deleteAsignatura(idAsignatura);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminada!','La asignatura ha sido eliminada correctamente.');
                    showSuccessAlert('Actualice la pagina','Actualice la pagina para ver los cambios');
                    setDataAsignatura([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la asignatura:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la asignatura.');
            }
        }
    };

    return {
        handleDelete
    };
};
export default useDeleteAsignatura;