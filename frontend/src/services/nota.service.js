import axios from './root.service.js';
import cookies from 'js-cookie';
import { formatNotaData } from '@helpers/formatData.js';

export async function getNotas() {
    try {
        const { data } = await axios.get('/nota/all/');
        console.log('Respuesta completa:', data);
        const formattedData = data.data.map(formatNotaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getNota(idNota) {
    try {
        const { data } = await axios.get(`/nota/${idNota}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createNota(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };
        const response = await axios.post('/nota/create/', data, { headers });
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateNota(data, idNota) {
    try {  
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        console.log('Datos enviados al backend:', data.calificacion, { headers });
        const response = await axios.patch(`/nota/${idNota}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteNota(idNota) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };
        const response = await axios.delete(`/nota/${idNota}`, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getNotasByHoja(rut) {
    try {
        const { data } = await axios.get(`/nota/hoja/${rut}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getNotasByAsignatura(idAsignatura) {
    try {
        const { data } = await axios.get(`/nota/asignatura/${idAsignatura}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}


