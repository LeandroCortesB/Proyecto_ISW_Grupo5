import axios from './root.service.js';
import cookies from 'js-cookie';
import { formatUserData } from '@helpers/formatData.js';
//import { formatAlumnoData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get('/user/all/',{ headers });
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getAlumnos() {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get('/user/alumnos/all',{ headers });

        const formattedData = data.data.map(formatUserData);
        
        return formattedData;
    } catch (error) {
        console.log("error ",error);
        return error.response.data;
    }
}


export async function getUser(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/user/${rut}`,{ headers });
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function createUser(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.post(`/user/`, data, { headers });
        
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function updateUser(data, rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`/user/update/?rut=${rut}`, data, { headers });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.delete(`/user/del/?rut=${rut}`, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUsersByCurso(idCurso) {
    try {
      const { data } = await axios.get(`/user/curso/${idCurso}`);
      return Array.isArray(data.data) ? data.data.flat() : data.data;
    } catch (error) {
      console.error("Error al obtener usuarios por curso:", error);
      return error.response?.data || { message: "Error desconocido" };
    }
  }
export async function getUsersByAsignatura(idAsignatura) {
    try {
        const { data } = await axios.get(`/user/asignatura/${idAsignatura}`);
        return data.data; // Ajusta esto si tu backend tiene un formato de respuesta diferente
    } catch (error) {
        console.error("Error al obtener usuarios por asignatura:", error);
        return error.response?.data || { message: "Error desconocido" };
    }
}

export async function getUserByRut(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/user/hoja/${rut}`,{ headers });
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}