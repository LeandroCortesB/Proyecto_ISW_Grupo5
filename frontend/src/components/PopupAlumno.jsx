import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';
import { getCursos } from '@services/curso.service.js';
import { useEffect , useState } from 'react';

export default function Popup({ show, setShow, data, action, rutcito }) {
    const userData = data && data.length > 0 ? data[0] : {};

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
        const dataToUpdate = { ...formData, rut: rutcito };
        action(dataToUpdate);
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
                        title="Editar alumno"
                        fields={[
                            {
                                label: "Nombre completo",
                                name: "nombreCompleto",
                                defaultValue: userData.nombreCompleto || "",
                                placeholder: 'Diego Alexis Salazar Jara',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                minLength: 15,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Correo electrónico",
                                name: "email",
                                defaultValue: userData.email || "",
                                placeholder: 'example@gmail.cl',
                                fieldType: 'input',
                                type: "email",
                                required: true,
                                minLength: 15,
                                maxLength: 30,
                            },
                            {
                                label: (
                                    <span>
                                        Nueva contraseña
                                        <span className='tooltip-icon'>
                                            <img src={QuestionIcon} />
                                            <span className='tooltip-text'>Este campo es opcional</span>
                                        </span>
                                    </span>
                                ),
                                name: "newPassword",
                                placeholder: "**********",
                                fieldType: 'input',
                                type: "password",
                                required: false,
                                minLength: 8,
                                maxLength: 26,
                                pattern: /^[a-zA-Z0-9]+$/,
                                patternMessage: "Debe contener solo letras y números",
                            },
                            {
                                label: "Curso",
                                name: "curso",
                                fieldType: 'select',
                                options: cursos.map((curso) => ({ value: curso.idCurso, label: curso.nombreCurso })),
                                required: true,
                                defaultValue: userData.curso,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar alumno"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}