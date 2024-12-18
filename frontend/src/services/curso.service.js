import axios from './root.service.js';
import cookies from 'js-cookie';
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
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`/curso/${idCurso}`, data, { headers });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteCurso(idCurso) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.delete(`/curso/${idCurso}`, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createCurso(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.post('/curso/', data, { headers });
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}