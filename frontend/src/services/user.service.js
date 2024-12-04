import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/user/all/');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getUser(rut) {
    try {
        const { data } = await axios.get(`/user/${rut}`);
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUser(data, rut) {
    try {
        const response = await axios.patch(`/user/update/?rut=${rut}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const response = await axios.delete(`/user/del/?rut=${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export async function getUsersByCurso(idCurso) {
    try {
        const { data } = await axios.get(`/user/curso/${idCurso}`);
        return data.data; // Ajusta esto si tu backend tiene un formato de respuesta diferente
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