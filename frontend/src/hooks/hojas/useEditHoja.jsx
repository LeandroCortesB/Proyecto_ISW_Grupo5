import { useState } from "react";
import { updateHoja } from "@services/hoja.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { formatHojaData } from "@helpers/formatData";

const useEditHoja = (setHojas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataHoja, setDataHoja] = useState([]);

    const handleClickUpdate = () => {
        if (dataHoja.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedHojaData) => {
        if (updatedHojaData) {
            try {
                console.log("Datos de hoja actualizados:", updatedHojaData);
                const updatedHoja = await updateHoja(updatedHojaData, Number(dataHoja[0].idHoja));
                console.log("Hoja actualizada:", updatedHoja);
                showSuccessAlert("¡Actualizado!", "La hoja ha sido actualizada correctamente.");
                setIsPopupOpen(false);
                const formattedHoja = formatHojaData(updatedHoja);
                console.log("Hoja formateada:", formattedHoja);

                setHojas((prevHojas) =>
                    prevHojas.map((hoja) =>
                        hoja.idHoja === formattedHoja.idHoja ? formattedHoja : hoja
                    )
                );

                setDataHoja([]);
            } catch (error) {
                console.error("Error al actualizar la hoja:", error);
                showErrorAlert("Cancelado", "Ocurrió un error al actualizar la hoja.");
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataHoja,
        setDataHoja,
    };
}

export default useEditHoja;