import { useState } from 'react'; 
import { createAsistencia } from '@services/asistencia.service.js'; // Asegúrate de que la ruta al servicio sea correcta

const AsistenciaForm = ({ asignatura, closeModal }) => {
  const [fecha, setFecha] = useState(''); // Estado para la fecha
  const [asistio, setAsistio] = useState(false); // Estado para saber si asistió o no
  const [error, setError] = useState(''); // Estado para manejar errores

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Validar que la fecha esté ingresada
    if (!fecha) {
      setError('La fecha es obligatoria.');
      return;
    }

    try {
      const response = await createAsistencia({
        fecha,
        asistio,  // Indica si asistió o no
        asignaturaId: asignatura.idAsignatura,  // Usar el id de la asignatura
      });

      if (response.status === 200) {
        alert('Asistencia registrada con éxito');
        closeModal();  // Cerrar el modal después de que el registro sea exitoso
      } else {
        setError('Hubo un error al registrar la asistencia.');
      }
    } catch (err) { // Usa 'err' aquí para manejar el error
      setError('Error al registrar la asistencia: ' + err.message); // Asegúrate de acceder al mensaje del error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required // Asegura que la fecha sea obligatoria
        />
      </div>
      
      <div>
        <label>Asistió:</label>
        <input
          type="checkbox"
          checked={asistio}
          onChange={(e) => setAsistio(e.target.checked)}  // Establecer el valor de "asistió"
        />
      </div>
      
      <div>
        <button type="submit">Registrar Asistencia</button>
        <button type="button" onClick={closeModal}>Cerrar</button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Muestra el mensaje de error si existe */}
    </form>
  );
};

export default AsistenciaForm;
