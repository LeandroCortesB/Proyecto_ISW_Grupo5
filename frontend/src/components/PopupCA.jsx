import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import '@styles/popup.css';



export default function PopupA({ show, setShow, action , idCurso }) {
    


    const patterName = new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/);

    // Obtener la lista de cursos
  
    // Asignar el nombre del curso basado en el idCurso
  
    const curso = Number(idCurso) ;
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
                            title="Crear Asignatura"
                            fields={[
                                {
                                    label: "Nombre Asignatura",
                                    name: "nombreAsignatura",
                                    placeholder: "Lenguaje",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: patterName,
                                    patternMessage: "El nombre de la Asignatura solo puede tener caracteres del diccionario español",
                                },
                                {
                                    label: "Curso Asociado",
                                    name: "curso",
                                    placeholder: idCurso,
                                    fieldType: "input",
                                    type: "number",
                                    value: curso, // Usar el estado del nombre del curso
                                    readOnly: true, // Hacer el campo no modificable
                                    style: { backgroundColor: "#f5f5f5", cursor: "not-allowed" },
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
