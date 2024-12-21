import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import '@styles/popup.css';



export default function PopupA({ show, setShow, action , idCurso }) {
    


  
    const handleSubmit = (formData) => {
        // Agregar idCurso a los datos del formulario
        const dataWithCourseId = { ...formData, idCurso: Number(idCurso) };
        console.log(dataWithCourseId);
        action(dataWithCourseId);
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
                                     fieldType: "select",
                                     options: [
                                         { value: "Lenguaje nivel primero medio ", label: "Lenguaje nivel primero medio" },
                                         { value: "Matemáticas nivel primero medio ", label: "Matemáticas nivel primero medio" },
                                         { value: "Historia nivel primero medio ", label: "Historia nivel primero medio" },
                                         { value: "Ciencias nivel primero medio ", label: "Ciencias nivel primero medio " },
                                         { value: "Inglés nivel primero medio ", label: "Inglés nivel primero medio" },
                                         { value: "Lenguaje nivel segundo medio ", label: "Lenguaje nivel segundo medio" },
                                         { value: "Matemáticas nivel segundo medio ", label: "Matemáticas nivel segundo medio" },
                                         { value: "Historia nivel segundo medio ", label: "Historia nivel segundo medio" },
                                         { value: "Ciencias nivel segundo medio ", label: "Ciencias nivel segundo medio" },
                                         { value: "Inglés nivel segundo medio ", label: "Inglés nivel segundo medio" },
                                         { value: "Lenguaje nivel tercero medio ", label: "Lenguaje nivel tercero medio" },
                                         { value: "Matemáticas nivel tercero medio ", label: "Matemáticas nivel tercero medio" },
                                         { value: "Historia nivel tercero medio ", label: "Historia nivel tercero medio" },
                                         { value: "Ciencias nivel tercero medio ", label: "Ciencias nivel tercero medio" },
                                         { value: "Inglés nivel tercero medio ", label: "Inglés nivel tercero medio" },
                                         { value: "Lenguaje nivel cuarto medio ", label: "Lenguaje nivel cuarto medio" },
                                         { value: "Matemáticas nivel cuarto medio ", label: "Matemáticas nivel cuarto medio" },
                                         { value: "Historia nivel cuarto medio ", label: "Historia nivel cuarto medio" },
                                         { value: "Ciencias nivel cuarto medio ", label: "Ciencias nivel cuarto medio" },
                                         { value: "Inglés nivel cuarto medio ", label: "Inglés nivel cuarto medio" },
                                     ],
                                     required: true,
                                     defaultValue: "Lenguaje",
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
