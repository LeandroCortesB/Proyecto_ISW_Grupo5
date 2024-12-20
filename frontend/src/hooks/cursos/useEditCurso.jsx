import {useState} from 'react';
import {updateCurso} from '@services/curso.service.js';
import {showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';
import {formatCursoData} from '@helpers/formatData.js';

const useEditCurso = (setCursos) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataCurso, setDataCurso] = useState([]);

    const handleClickUpdate = () => {
        if (dataCurso.length > 0) {
            setIsPopupOpen(true);
        }
    };
    const handleUpdate = async (updatedCursoData) => {
        if (updatedCursoData) {
            try {
                console.log('Datos de curso actualizados:', updatedCursoData);
                const updatedCurso = await updateCurso(updatedCursoData, Number(dataCurso[0].idCurso));
                console.log('Curso actualizado:', updatedCurso);
                showSuccessAlert('¡Actualizado!','El curso ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedCurso = formatCursoData(updatedCurso);
                console.log('Curso formateado:', formattedCurso);

                setCursos(prevCursos =>
                    prevCursos.map(curso =>
                        curso.idCurso === formattedCurso.idCurso
                            ? formattedCurso
                            : curso
                    )
                )
                
                setDataCurso([]);
                console.log("Datos:", dataCurso);
            } catch (error) {
                console.error('Error al actualizar el curso:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el curso.');
            }
        }
    };
return{
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataCurso,
    setDataCurso

};
};
export default useEditCurso;