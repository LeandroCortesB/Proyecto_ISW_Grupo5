import axios from './root.service.js';
import cookies from 'js-cookie';
import { formatHojaData } from '@helpers/formatData.js';

export async function getHojas(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/hoja/all/${rut}`, { headers });
        const formattedData = data.data.map(formatHojaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function getHoja(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/hoja/${rut}`, { headers });
        const formattedData = data.data.map(formatHojaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function createHoja(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.post(`/hoja/`, data, { headers });
        
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function updateHoja(data, idHoja) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`/hoja/update/${idHoja}`, data, { headers });
        return response;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteHoja(idHoja) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };
        
        const response = await axios.delete(`/hoja/del/?idHoja=${idHoja}`, { headers });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
