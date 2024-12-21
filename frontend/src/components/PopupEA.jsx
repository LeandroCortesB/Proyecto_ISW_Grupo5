import Form from "./Form";
import CloseIcon from "@assets/XIcon.svg";
import '@styles/popup.css';




export default function Popup({ show, setShow, data, action }){
    const AsignaturaData = data && data.length > 0 ? data[0] : {};

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
                                pattern: (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/),
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText={"Editar"}
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}
