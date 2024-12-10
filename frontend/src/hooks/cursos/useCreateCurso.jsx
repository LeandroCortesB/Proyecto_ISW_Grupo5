import { useState } from 'react';
import { createCurso } from '@services/curso.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreate } from '@helpers/formatData.js';

const useCreateCurso = (setCursos) => {
    const [isPopupCCOpen, setIsPopupCCOpen] = useState(false);

    const handleClickAdd = () => {
        setIsPopupCCOpen(true);
    };
    const handleCreate = async (newCursoData) => {
        try {
            const createdCurso = await createCurso(newCursoData);

            const formattedCurso = formatPostCreate(createdCurso);

            setCursos(prevCursos => [...prevCursos, formattedCurso]);

            showSuccessAlert('¡Creado!', 'El curso ha sido creado exitosamente.');
            setIsPopupCCOpen(false);

        } catch (error) {
            console.error('Error al crear el curso:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al crear el curso.');
        }
    };

    return {
        handleClickAdd,
        handleCreate,
        isPopupCCOpen,
        setIsPopupCCOpen
    };
}
export default useCreateCurso;