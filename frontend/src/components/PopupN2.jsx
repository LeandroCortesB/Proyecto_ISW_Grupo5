import Form from "./Form";
import '@styles/Popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupN2({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData); 
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Crear Nota"
                            fields={[
                                {
                                    label: "Alumno",
                                    name: "nombreCompleto",
                                    placeholder: 'Ej: Esteban Paredes Perez',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 50,
                                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "Debe contener solo letras y espacios",
                                },
                                {
                                    label: "Nota",
                                    name: "calificacion",
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 1,
                                    max: 7,
                                },
                                {
                                    label: "Asignatura",
                                    name: "nombreAsignatura",
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 3,
                                    maxLength: 30,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear Nota" 
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}