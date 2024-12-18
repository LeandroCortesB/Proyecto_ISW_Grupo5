import { useState } from 'react';
import { createUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostCreate } from '@helpers/formatData.js';

const useCreateUser = (setUsers) => {
    const [isPopup2Open, setIsPopup2Open] = useState(false);

    const handleClickAdd = () => {
        setIsPopup2Open(true);
    };

    const handleCreate = async (newUserData) => {
            try {
                const createdUser = await createUser(newUserData);

                const formattedUser = formatPostCreate(createdUser); 

                if(formattedUser.rol===null||formattedUser.rol===undefined||formattedUser.rol===""){
                    showErrorAlert('Cancelado', 'Ocurrió un error al crear el usuario.');
                }else{
                    setUsers(prevUsers => [...prevUsers, formattedUser]);
                    showSuccessAlert('¡Creado!', 'El usuario ha sido creado exitosamente.');
                }

                setIsPopup2Open(false);
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al crear el usuario.');
            }
    };

    return {
        handleClickAdd,   
        handleCreate,      
        isPopup2Open,       
        setIsPopup2Open     
    };
};

export default useCreateUser;
