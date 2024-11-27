import axios from './root.service.js';
import { formatHojaData } from '@helpers/formatData.js';

export async function getHojas() {
    try {
        const { data } = await axios.get('/hoja/all/');
        const formattedData = data.data.map(formatHojaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getHoja(rut) {
    try {
        const { data } = await axios.get(`/hoja/${rut}`);
        const formattedData = data.data.map(formatHojaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateHoja(data, rut) {
    try {
        const response = await axios.patch(`/hoja/update/?rut=${rut}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteHoja(rut) {
    try {
        const response = await axios.delete(`/hoja/del/?rut=${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}