import { useState } from "react";
import { updateHoja } from "@services/hoja.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { formatHojaData } from "@helpers/formatData";

const useEditHoja = (setHojas) => {
    const [isPopupHOpen, setIsPopupHOpen] = useState(false);
    const [dataHoja, setDataHoja] = useState([]);

    const handleClickUpdateH = () => {
        if (dataHoja.length > 0) {
            setIsPopupHOpen(true);
        }
    };

    const handleUpdateH = async (updatedHojaData) => {
        if (updatedHojaData) {
            try {
                const updatedHoja = await updateHoja(updatedHojaData, dataHoja[0].idHoja);
                showSuccessAlert("¡Actualizado!", "La hoja ha sido actualizada correctamente.");
                setIsPopupHOpen(false);
                const formattedHoja = formatHojaData(updatedHoja);

                console.log("Hoja formateada:", formattedHoja);

                setHojas(prevHojas => prevHojas.map(hoja => {
                    console.log("Hoja actual:", hoja);
                    if (hoja.idHoja === formattedHoja.idHoja) {
                        console.log("Reemplazando con:", formattedHoja);
                    }
                    return hoja.nombreCompleto === formattedHoja.nombreCompleto ? formattedHoja : hoja;
                }));

                setDataHoja([]);
            } catch (error) {
                console.error("Error al actualizar la hoja:", error);
                showErrorAlert("Cancelado", "Ocurrió un error al actualizar la hoja.");
            }
        }
    };

    return {
        handleClickUpdateH,
        handleUpdateH,
        isPopupHOpen,
        setIsPopupHOpen,
        dataHoja,
        setDataHoja,
    };
}

export default useEditHoja;