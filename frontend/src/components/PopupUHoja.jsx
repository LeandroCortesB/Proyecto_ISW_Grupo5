import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupUHoja({ 
    show, 
    setShow, 
    data,
    action,
    idHojaSeleccionado,
}) {

    const handleSubmit = (formData) => {
        const idHojaldre = Number(idHojaSeleccionado[0].idHoja);
        const dataToUpdate = { ...formData, idHoja: idHojaldre };
        action(dataToUpdate); 
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Close" />
                        </button>
                        <Form
                            title="Actualizar Anotación"
                            fields={[
                                {
                                    label: "Anotación",
                                    name: "anotacion",
                                    placeholder: 'Escribe la anotación aquí...',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 3,
                                    maxLength: 500,
                                    required: true,
                                    defaultValue: data.anotacion || '',
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Modificar anotacion"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
