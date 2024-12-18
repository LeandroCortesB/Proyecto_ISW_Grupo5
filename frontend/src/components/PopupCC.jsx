import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import "@styles/popup.css";

export default function PopupC({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData);
    };

    const patternName = new RegExp(/^[1-4][A-Z]$/);

    return(
        <div>
            {show &&(
                <div className="bg">
                <div className="popup">
                    <button className="close" onClick={() => setShow(false)}>
                <img src={CloseIcon} />
            </button>
            <Form
                title = "Crear Curso"
                fields={[
                    {
                        label: "Nombre del Curso",
                        name: "nombreCurso",
                        placeholder: "1A",
                        fieldType: "input",
                        type: "text",
                        required: true,
                        minLength: 2,
                        maxLength: 2,
                        pattern: patternName,
                        patternMessage: 'El nombre del curso debe tener el formato "número-guion-letra mayúscula" (ej: 1-A).'
                    },
                ]}
                onSubmit={handleSubmit}
                buttonText={"Crear"}
                backgroundColor={"#fff"}
                />
            </div>
            </div>
            )}
        </div>
    )
}