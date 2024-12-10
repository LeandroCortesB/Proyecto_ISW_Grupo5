import { useState } from "react";
import { createAsignatura } from "@services/Asignatura.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostCreate } from "@helpers/formatData.js";

const useCreateAsignatura = (setAsistencias) => {
    const [isPopupCAOpen, setIsPopupCAOpen] = useState(false);

    const handleClickAdd = () => {
        setIsPopupCAOpen(true);
    }
    const handleCreate = async (newAsignaturaData) => {
        try {
            const createdAsistencia = await createAsignatura(newAsignaturaData);

            const formattedAsistencia = formatPostCreate(createdAsistencia);

            setAsistencias(prevAsistencias => [...prevAsistencias, formattedAsistencia]);

            showSuccessAlert("¡Creado!", "La asignatura ha sido creada exitosamente.");
            setIsPopupCAOpen(false);

        } catch (error) {
            console.error("Error al crear la asignatura:", error);
            showErrorAlert("Cancelado", "Ocurrió un error al crear la asignatura.");
        }
    };
    return {
        handleClickAdd,
        handleCreate,
        isPopupCAOpen,
        setIsPopupCAOpen
    };
}
export default useCreateAsignatura;