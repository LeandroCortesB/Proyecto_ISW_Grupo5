import { useState } from 'react';
import { createNota } from '@services/nota.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreateNota } from '@helpers/formatData.js';

const useCreateNota = (setNotas) => {
    const [isPopup2Open, setIsPopup2Open] = useState(false);

    const handleClickAdd = () => {
        setIsPopup2Open(true);
    };

    const validarNota = (nota) => {
        for (let key in nota) {
            if (typeof nota[key] === 'string' && nota[key].trim() === 'Client error') {
                return false;
            }
        }
        return true;
    };

    const handleCreate = async (newNotaData) => {
        try {
            console.log("CONSOLE 1", newNotaData);
            const createdNota = await createNota(newNotaData);
            console.log('console 2', createdNota);

            if (!validarNota(createdNota)) {
                throw new Error('La nota contiene campos vacíos.');
                
            }
    
            const formattedNota = formatPostCreateNota(createdNota);
            console.log('console 3', formattedNota);
            setNotas(prevNotas => [...prevNotas, formattedNota]);
    
            showSuccessAlert('¡Creado!', 'La nota ha sido creada exitosamente.');
            setIsPopup2Open(false);
    
        } catch (error) {
            console.error('Error al crear la nota:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al crear la nota.');
        }
    };
    return {
        handleClickAdd,
        handleCreate,
        isPopup2Open,
        setIsPopup2Open
    };
}

export default useCreateNota;