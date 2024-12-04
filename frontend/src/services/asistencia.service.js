import axios from './root.service.js'; // Importamos la configuración básica de axios
import { formatAsistenciaData } from '@helpers/formatData.js'; // Si tienes un helper para formatear los datos

// Función para obtener todas las asistencias
export async function getAsistencias() {
    try {
        const { data } = await axios.get('/asistencia/all');
        const formattedData = data.data.map(formatAsistenciaData); // Aquí puedes formatear la data si es necesario
        return formattedData;
    } catch (error) {
        console.error("Error al obtener las asistencias:", error);
        return error.response.data;
    }
}
export async function registrarAsistencia(idAsignatura) {
    try {
        // Hacemos una llamada POST para registrar la asistencia, pasando el ID de la asignatura en el cuerpo de la solicitud
        const response = await axios.post('/asistencia', {
            idAsignatura,  // El ID de la asignatura que se pasa al backend
        });
        return response.data;  // Devolvemos la respuesta
    } catch (error) {
        console.error("Error al registrar la asistencia:", error);
        throw error;  // Lanzamos el error para que pueda ser manejado en el frontend
    }
}

// Función para obtener una asistencia específica por su ID
export async function getAsistencia(idAsistencia) {
    try {
        const { data } = await axios.get(`/asistencia/${idAsistencia}`);
        const formattedData = formatAsistenciaData(data.data);
        return formattedData;
    } catch (error) {
        console.error("Error al obtener la asistencia:", error);
        return error.response.data;
    }
}

// Función para crear una nueva asistencia
export async function createAsistencia(asistenciaData) {
    try {
        const response = await axios.post('/asistencia', asistenciaData);
        return response.data.data; // Asumiendo que la respuesta está en data.data
    } catch (error) {
        console.error("Error al crear la asistencia:", error);
        return error.response.data;
    }
}

// Función para actualizar una asistencia existente
export async function updateAsistencia(asistenciaData, idAsistencia) {
    try {
        const response = await axios.patch(`/asistencia/${idAsistencia}`, asistenciaData);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar la asistencia:", error);
        return error.response.data;
    }
}

// Función para eliminar una asistencia por ID
export async function deleteAsistencia(idAsistencia) {
    try {
        const response = await axios.delete(`/asistencia/${idAsistencia}`);
        return response.data; // Asumiendo que la respuesta está en data
    } catch (error) {
        console.error("Error al eliminar la asistencia:", error);
        return error.response.data;
    }
}