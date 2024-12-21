import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import "@styles/popup.css";

export default function PopupA({ show, setShow, data, action }) {
  const asistenciaData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action({
      ...asistenciaData, // Datos originales de la asistencia
      ...formData, // Datos actualizados desde el formulario
    });
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <Form
              title="Editar Asistencia"
              fields={[
                {
                  label: "Fecha de Asistencia",
                  name: "fecha",
                  defaultValue: asistenciaData.fecha || "",
                  fieldType: "input",
                  type: "date",
                  required: true,
                },
                {
                  label: "Estado de Asistencia",
                  name: "asistio",
                  defaultValue:
                    asistenciaData.asistio === true
                      ? "Presente"
                      : asistenciaData.asistio === false
                      ? "Ausente"
                      : "Justificado",
                  fieldType: "select",
                  options: [
                    { label: "Presente", value: true },
                    { label: "Ausente", value: false },
                    { label: "Justificado", value: "Justificado" },
                  ],
                  required: true,
                },
              ]}
              onSubmit={handleSubmit}
              buttonText={"Actualizar"}
              backgroundColor={"#fff"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
