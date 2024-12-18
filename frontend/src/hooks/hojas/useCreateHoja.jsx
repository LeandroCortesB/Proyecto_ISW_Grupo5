import { useState } from 'react';
import { createHoja } from '@services/hoja.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreateHoja } from '@helpers/formatData.js';

const useCreateHoja = (setHojas) => {
    const [isPopupHojaOpen, setIsPopupHojaOpen] = useState(false);

    const handleClickAddHoja = () => {
        setIsPopupHojaOpen(true);
    };

    const handleCreateHoja = async (newHojaData) => {
            try {
                const createdHoja = await createHoja(newHojaData);
                
                const formattedHoja = formatPostCreateHoja(createdHoja); 

                setHojas(prevHojas => [...prevHojas, formattedHoja]);

                showSuccessAlert('¡Creada!', 'La hoja ha sido creado exitosamente.');
                setIsPopupHojaOpen(false);

            } catch (error) {
                console.error('Error al crear la hoja:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al crear la hoja.');
            }
    };

    return {
        handleClickAddHoja,   
        handleCreateHoja,      
        isPopupHojaOpen,       
        setIsPopupHojaOpen     
    };
};

export default useCreateHoja;
