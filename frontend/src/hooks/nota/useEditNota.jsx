import { useState } from "react";
import { updateNota } from "@services/nota.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { formatNotaData } from "@helpers/formatData";

const useEditNota = (setNotas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataNota, setDataNota] = useState([]); // Guarda los datos originales de la nota

    const handleClickUpdate = (nota) => {
        setDataNota([nota]);
        setIsPopupOpen(true);
    };

    const handleUpdate = async (updatedNotaData) => {
        if (updatedNotaData) {
            try {
                // Asegúrate de mantener la fecha de creación original
                const originalFechaCreacion = dataNota[0].fechaCreacion;

                // Combina los datos actualizados con la fecha original
                const updatedNotaPayload = {
                    ...updatedNotaData,
                    fechaCreacion: originalFechaCreacion,
                };

                // Envía los datos al backend
                const updatedNota = await updateNota(updatedNotaPayload, Number(dataNota[0].idNota));
                console.log("updatedNota", updatedNota);
                // Mensaje de éxito
                showSuccessAlert("¡Actualizado!", "La nota ha sido actualizada correctamente.");
                setIsPopupOpen(false);

                // Formatea y actualiza las notas en el estado global
                const formattedNota = formatNotaData(updatedNota);
                setNotas((prevNotas) =>
                    prevNotas.map((nota) =>
                        nota.idNota === formattedNota.idNota ? formattedNota : nota
                    )
                );

                setDataNota([]); // Limpia los datos de nota seleccionados
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
};

export default useEditNota;
