import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import '@styles/popup.css';
import { useEffect , useState } from 'react';
import { getCursos } from '@services/curso.service.js';



export default function Popup({ show, setShow, data, action }){
    const AsignaturaData = data && data.length > 0 ? data[0] : {};

    const [cursos, setCursos] = useState([]);
    
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await getCursos(); 
                setCursos(response);
            } catch (err) {
                console.error("Error fetching cursos: ", err);
            }
        };
        fetchCursos();
    },[]);

   
    const handleSubmit = (formData) => {
        action(formData);
    };
    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar asignatura"
                        fields={[
                            {
                                label: "Nombre de la asignatura",
                                name: "nombreAsignatura",
                                defaultValue: AsignaturaData.nombreAsignatura || "",
                                placeholder: 'Matemáticas',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 3,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Curso",
                                name: "curso",
                                fieldType: 'select',
                                options: cursos.map((curso) => ({ value: curso.idCurso, label: curso.nombreCurso })),
                                required: true,
                                defaultValue: AsignaturaData.curso || "",
                            },
                        ]}
                        onSubmit={handleSubmit}
                        submitText="Guardar"
                    />
                </div>
            </div>
            )}
        </div>
    );
}
