import { useState } from "react";
import { updateAsistencia } from "@services/asistencia.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostUpdate } from "@helpers/formatData.js";

const useEditAsistencia = (setAsistencias, fetchAsistencias) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataAsistencia, setDataAsistencia] = useState([]);

  const handleClickUpdate = () => {
    if (dataAsistencia.length > 0) {
      setIsPopupOpen(true);
    }
  };
  const handleUpdate = async (updatedAsistenciaData) => {
    if (updatedAsistenciaData) {
      try {
        const updatedAsistencia = await updateAsistencia(
          updatedAsistenciaData,
          Number(dataAsistencia[0].idAsistencia)
        );
        showSuccessAlert(
          "¡Actualizado!",
          "La asistencia ha sido actualizada correctamente."
        );
        setIsPopupOpen(false);
        const formattedAsistencia = formatPostUpdate(updatedAsistencia);

        setAsistencias((prevAsistencias) =>
          prevAsistencias.map((asistencia) => {
            console.log("Asistencia actual:", asistencia);
            if (asistencia.idAsistencia === formattedAsistencia.idAsistencia) {
              console.log("Reemplazando con:", formattedAsistencia);
            }
            return asistencia.idAsistencia === formattedAsistencia.idAsistencia
              ? formattedAsistencia
              : asistencia;
          })
        );
        await fetchAsistencias();
        setDataAsistencia([]);
      } catch (error) {
        console.error("Error al actualizar la asistencia:", error);
        showErrorAlert(
          "Cancelado",
          "Ocurrió un error al actualizar la asistencia."
        );
      }
    }
  };
  return {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataAsistencia,
    setDataAsistencia,
  };
};
export default useEditAsistencia;
