import axios from './root.service.js';
import cookies from 'js-cookie';
import { formatAsignaturaData } from '@helpers/formatData.js';

export async function getAsignaturas() {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get('/asignatura/all/', { headers });
        const formattedData = data.data.map(formatAsignaturaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getAsignatura(idAsignatura) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/asignatura/${idAsignatura}`, { headers });
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createAsignatura(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.post('/asignatura/create/', data, { headers });
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateAsignatura(data, idAsignatura) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`/asignatura/update/?idAsignatura=${idAsignatura}`, data, { headers });
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteAsignatura(idAsignatura) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.delete(`/asignatura/del/?idAsignatura=${idAsignatura}`, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getAsignaturasByCurso(idCurso) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/asignatura/curso/${idCurso}`, { headers });
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}