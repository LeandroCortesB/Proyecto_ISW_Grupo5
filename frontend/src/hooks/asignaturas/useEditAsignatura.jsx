import { useState } from "react";
import { updateAsignatura } from "@services/asignatura.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostUpdate } from "@helpers/formatData.js";

const useEditAsignatura = (setAsignaturas, fetchAsignaturas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataAsignatura, setDataAsignatura] = useState([]);

    const handleClickUpdate = () => {
        if (dataAsignatura.length > 0) {
            setIsPopupOpen(true);
        }
    }

    const handleUpdate = async (updatedAsignaturaData) => {
        if (updatedAsignaturaData) {
            try {
                const updatedAsignatura = await updateAsignatura(updatedAsignaturaData, Number(dataAsignatura[0].idAsignatura));
                showSuccessAlert("¡Actualizado!", "La asignatura ha sido actualizada correctamente.");
                setIsPopupOpen(false);
                const formattedAsignatura = formatPostUpdate(updatedAsignatura);

                setAsignaturas(prevAsignaturas => prevAsignaturas.map(asignatura => {
                    console.log("Asignatura actual:", asignatura);
                    if (asignatura.idAsignatura === formattedAsignatura.idAsignatura) {
                        console.log("Reemplazando con:", formattedAsignatura);
                    }
                    return asignatura.idAsignatura === formattedAsignatura.idAsignatura ? formattedAsignatura : asignatura;
                }));
                await fetchAsignaturas();
                setDataAsignatura([]);
            } catch (error) {
                console.error("Error al actualizar la asignatura:", error);
                showErrorAlert("Cancelado", "Ocurrió un error al actualizar la asignatura.");
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataAsignatura,
        setDataAsignatura
    };
}
export default useEditAsignatura;