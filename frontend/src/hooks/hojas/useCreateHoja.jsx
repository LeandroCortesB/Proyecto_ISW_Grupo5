import { useState } from 'react';
import { createHoja } from '@services/hoja.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreate } from '@helpers/formatData.js';

//Falta crear el handleonClick, la popup y el formatPostCreate 

const useCreateHoja = (setHojas) => {
    const [isPopup2Open, setIsPopup2Open] = useState(false);

    const handleClickAdd = () => {
        setIsPopup2Open(true);
    };

    const handleCreate = async (newHojaData) => {
            try {
                const createdHoja = await createHoja(newHojaData);

                const formattedHoja = formatPostCreate(createdHoja); 
                
                setHojas(prevUsers => [...prevUsers, formattedHoja]);

                showSuccessAlert('¡Creada!', 'La hoja ha sido creado exitosamente.');
                setIsPopup2Open(false);

            } catch (error) {
                console.error('Error al crear la hoja:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al crear la hoja.');
            }
    };

    return {
        handleClickAdd,   
        handleCreate,      
        isPopup2Open,       
        setIsPopup2Open     
    };
};

export default useCreateHoja;
