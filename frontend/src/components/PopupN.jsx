import Form from './Form';
import CloseIcon from '@assets/XIcon.svg';
import '@styles/popup.css';

export default function PopupN({ show, setShow, data, action }) {
    const userData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

return (
    <div>
        {show && (
            <div className="bg">
                <div className='popup'>
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar Nota"
                        fields={[
                            {
                                label: 'Calificación',
                                name: 'calificacion',
                                defaultValue: userData.calificacion || "",
                                placeholder: '4',
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                minLength: 2,
                                maxLength: 2,
                                pattern: /^(10|[1-6][0-9]|70)$/,
                                patternMessage: 'Debe ser un número entre 10 y 70'
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText={'Actualizar'}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
        )}
    </div>
)}
