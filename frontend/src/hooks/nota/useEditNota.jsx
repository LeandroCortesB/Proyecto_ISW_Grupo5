import { useState } from "react";
import { updateNota } from "@services/nota.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { formatNotaData } from "@helpers/formatData";

const useEditNota = (setNotas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataNota, setDataNota] = useState([]);

    const handleClickUpdate = (nota) => {
        setDataNota([nota]); 
        setIsPopupOpen(true); 
    };
    

    const handleUpdate = async (updatedNotaData) => {
        if (updatedNotaData) {
            console.log("Datos de nota a actualizar:", updatedNotaData);
            try {
                console.log("Datos de nota actualizados:", updatedNotaData);
                const updatedNota = await updateNota(updatedNotaData, Number(dataNota[0].idNota));
                console.log("Nota actualizada:", updatedNota);
                showSuccessAlert("¡Actualizado!", "La nota ha sido actualizada correctamente.");
                setIsPopupOpen(false);
                const formattedNota = formatNotaData(updatedNota);
                console.log("Nota formateada:", formattedNota);

                setNotas((prevNotas) =>
                    prevNotas.map((nota) =>
                        nota.idNota === formattedNota.idNota ? formattedNota : nota
                    )
                );

                setDataNota([]);
            } catch (error) {
                console.error("Error al actualizar la nota:", error);
                showErrorAlert("Cancelado", "Ocurrió un error al actualizar la nota.");
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataNota,
        setDataNota,
    };
}

export default useEditNota;