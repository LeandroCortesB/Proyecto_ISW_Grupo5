import { useState } from 'react';
import { createAsignatura } from '@services/asignatura.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatAsignaturaData } from '@helpers/formatData.js';


const useCreateAsignatura = (setAsignaturas) => {
    const [isPopupAsignaturaOpen, setIsPopupAsignaturaOpen] = useState(false);

    const handleClickAddAsignatura = () => {
        setIsPopupAsignaturaOpen(true);
    }

    const handleCreateAsignatura = async (newAsignaturaData) => {
        try {
            console.log("CONSOLE 1",newAsignaturaData);
            newAsignaturaData.idCurso = parseInt(newAsignaturaData.idCurso);
            await createAsignatura(newAsignaturaData).then((response) => {
              //reatedAsignatura = response;
              console.log("CONSOLE 2",response);
              const formattedAsignatura = formatAsignaturaData(response);
              console.log("CONSOLE 3",formattedAsignatura);
              setAsignaturas(prevCursos => [...prevCursos, formattedAsignatura]);
              showSuccessAlert('¡Creada!', 'La asignatura ha sido creado exitosamente.');
              setIsPopupAsignaturaOpen(false);
            }).catch((error) => {
                console.error('Error al crear la asignatura:', error);
              showErrorAlert('Cancelado', 'Ocurrió un error al crear la asignatura.');
              setIsPopupAsignaturaOpen(false);
            });
            //console.log('console 2',createdAsignatura);

            //const formattedAsignatura = formatAsignaturaData(createdAsignatura);
            
            //console .log('console 3',formattedAsignatura);
            //setAsignaturas(prevAsignaturas => [...prevAsignaturas, formattedAsignatura]);
            
      

        } catch (error) {
            console.error('Error al crear la asignatura:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al crear la asignatura.');
        }
    };

    return {
        handleClickAddAsignatura,
        handleCreateAsignatura,
        isPopupAsignaturaOpen,
        setIsPopupAsignaturaOpen
    };
    }
    export default useCreateAsignatura;