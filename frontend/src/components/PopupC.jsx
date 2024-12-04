import Form from './Form';
import CloseIcon from '@assets/XIcon.svg';
import '@styles/Popup.css';

export default function PopupC({ show, setShow, data, action }) {
    const userData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };
    const patternNombreCurso = new RegExp(/^\d+[A-Z]$/);
    return (
        <di>
            {show &&(
                <div className="bg">
                    <div className='popup'>
                        <button className='close' onClick={()=>setShow(false)}>
                            <img src={CloseIcon}/>
                        </button>
                        <Form
                            title="Editar Curso"
                            fields={[
                                {
                                    label: 'Nombre del Curso',
                                    name: 'nombreCurso',
                                    defaultValue: userData.nombreCurso || "",
                                    placeholder: '1A',
                                    patternNombreCurso,
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 2,
                                    maxLength: 2,
                                    patternMessage: 'El nombre del curso debe tener el formato "número-guion-letra mayúscula" (ej: 1-A).'
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={'Actualizar'}
                            backgroundColor={'#fff'}
/>
                    </div>
                    </div>
            )}
        </di>
    )};