import axios from './root.service.js'; 
import cookies from 'js-cookie';
import { formatAsistenciaData } from '@helpers/formatData.js';


export async function getAsistencias() {
    try {
        const { data } = await axios.get('/asistencia/all');
        const formattedData = data.data.map(formatAsistenciaData);
        return formattedData;
    } catch (error) {
        console.error("Error al obtener las asistencias:", error);
        return error.response.data;
    }
}
export async function registrarAsistencia(idAsignatura) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`, 
        };
        
        const response = await axios.post('/asistencia', {
            idAsignatura,headers  
        });
        return response.data;  
    } catch (error) {
        console.error("Error al registrar la asistencia:", error);
        throw error;  
    }
}

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

export async function createAsistencia(asistenciaData) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`, 
        };
        const response = await axios.post('/asistencia', asistenciaData, { headers });
        return response.data.data; 
    } catch (error) {
        console.error("Error al crear la asistencia:", error);
        throw error.response ? error.response.data : new Error("Error desconocido al crear la asistencia.");
    }
}


export async function updateAsistencia(asistenciaData, idAsistencia) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };
        const response = await axios.patch(`/asistencia/${idAsistencia}`, asistenciaData, { headers });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar la asistencia:", error);
        return error.response.data;
    }
}

export async function deleteAsistencia(idAsistencia) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };
        const response = await axios.delete(`/asistencia/${idAsistencia}`, { headers });
        return response.data; 
    } catch (error) {
        console.error("Error al eliminar la asistencia:", error);
        return error.response.data;
    }
}

export const getAsistenciasByAlumno = async (rut, fechaInicio, fechaFin, idAsignatura) => {
    try {
      const response = await axios.get(`/asistencia/users/${rut}`,
        {
          params: {
            fechaInicio,
            fechaFin,
            idAsignatura,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token JWT
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
      throw error.response?.data?.message || "Error al cargar asistencias.";
    }
  };