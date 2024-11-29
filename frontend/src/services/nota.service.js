import axios from './root.service.js';
import { formatNotaData } from '@helpers/formatData.js';

export async function getNotas() {
    try {
        const { data } = await axios.get('/nota/all/');
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
        const response = await axios.post('/nota/create/', data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateNota(data, idNota) {
    try {
        const response = await axios.patch(`/nota/update/?idNota=${idNota}`, data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteNota(idNota) {
    try {
        const response = await axios.delete(`/nota/del/?idNota=${idNota}`);
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


