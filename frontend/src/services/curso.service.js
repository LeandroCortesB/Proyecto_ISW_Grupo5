import axios from './root.service.js';
import { formatCursoData } from '@helpers/formatData.js';

export async function getCursos() {
    try {
        const { data } = await axios.get('/curso/all/');
        const formattedData = data.data.map(formatCursoData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getCurso(idCurso) {
    try {
        const { data } = await axios.get(`/curso/${idCurso}`);
        const formattedData = data.data.map(formatCursoData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateCurso(data, idCurso) {
    try {
        const response = await axios.patch(`/curso/update/?idCurso=${idCurso}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteCurso(idCurso) {
    try {
        const response = await axios.delete(`/curso/del/?idCurso=${idCurso}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}