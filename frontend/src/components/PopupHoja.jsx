import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupHoja({ show, setShow, action, rutSeleccionado, nombreSeleccionado }) {
    
    const handleSubmit = (formData) => {
        
        const dataWithRut = { ...formData, rut: rutSeleccionado, nombreCompleto: nombreSeleccionado };
        console.log(dataWithRut);
        action(dataWithRut);
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
                            title="Crear anotacion"
                            fields={[
                                {
                                    label: "Anotación",
                                    name: "anotacion",
                                    placeholder: 'Escribe la anotación aquí...',
                                    fieldType: 'textarea',
                                    maxLength: 500,
                                    required: true,
                                },
                                {
                                    label: "Tipo de anotación",
                                    name: "buena",
                                    fieldType: 'select',
                                    options: [
                                        { value: true, label: 'Buena' },
                                        { value: false, label: 'Mala' },
                                    ],
                                    required: true,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Crear Hoja"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
