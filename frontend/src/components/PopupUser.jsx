import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function Popup2({ show, setShow, action }) {
    const handleSubmit = (formData) => {
        action(formData); 
    };

    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/);

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Crear Usuario"
                            fields={[
                                {
                                    label: "Nombre completo",
                                    name: "nombreCompleto",
                                    placeholder: 'Ej: Vicente Gajardo Perez',
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
                                    placeholder: 'example@gmail.cl',
                                    fieldType: 'input',
                                    type: "email",
                                    required: true,
                                    minLength: 15,
                                    maxLength: 30,
                                },
                                {
                                    label: "Rut",
                                    name: "rut",
                                    placeholder: '21.368.070-1',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 9,
                                    maxLength: 12,
                                    pattern: patternRut,
                                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                    required: true,
                                },
                                {
                                    label: "Rol",
                                    name: "rol",
                                    fieldType: 'select',
                                    options: [
                                        { value: 'usuario', label: 'Usuario' },
                                        { value: 'alumno', label: 'Alumno' },
                                        { value: 'apoderado', label: 'Apoderado' },
                                        { value: 'profesor', label: 'Profesor' },

                                    ],
                                    required: true,
                                },
                                {
                                    label: "Contraseña",
                                    name: "password",
                                    placeholder: "**********",
                                    fieldType: 'input',
                                    type: "password",
                                    required: true,
                                    minLength: 8,
                                    maxLength: 26,
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    patternMessage: "Debe contener solo letras y números",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear Usuario"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
