import axios from './root.service.js';
import cookies from 'js-cookie';

export async function getPagina(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const { data } = await axios.get(`/pagina/${rut}`, { headers });
        data.data
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createPagina(data) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.post(`/pagina/`, data, { headers });
        
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function updatePagina(data, rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.patch(`/pagina/update/${rut}`, data, { headers });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deletePagina(rut) {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Autorization: `Bearer ${token}`,
        };

        const response = await axios.delete(`/pagina/del/${rut}`, { headers });
        console.log(response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
