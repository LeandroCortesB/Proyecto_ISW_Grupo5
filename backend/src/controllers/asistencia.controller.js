"use strict";
import {
    createAsistenciaService,
    deleteAsistenciaService,
    getAsistenciaService,
    getAsistenciasService,
    updateAsistenciaService,
} from "../services/asistencia.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getAsistencias(req, res) {
    try {
        const [asistencias, errorAsistencias] = await getAsistenciasService(req.query);
        if (errorAsistencias) return handleErrorClient(res, 404, errorAsistencias);
        handleSuccess(res, 200, "Asistencias encontradas", asistencias);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAsistencia(req, res) {
    try {
        const [asistencia, errorAsistencia] = await getAsistenciaService(req.query);
        if (errorAsistencia) return handleErrorClient(res, 404, errorAsistencia);
        handleSuccess(res, 200, "Asistencia encontrada", asistencia);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createAsistencia(req, res) {
    try {
        const [asistencia, errorAsistencia] = await createAsistenciaService(req.body);
        if (errorAsistencia) return handleErrorClient(res, 400, errorAsistencia);
        handleSuccess(res, 201, "Asistencia creada correctamente", asistencia);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateAsistencia(req, res) {
    try {
        const [asistencia, errorAsistencia] = await updateAsistenciaService(req.params.idAsistencia, req.body);
        if (errorAsistencia) return handleErrorClient(res, 404, errorAsistencia);
        handleSuccess(res, 200, "Asistencia actualizada correctamente", asistencia);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteAsistencia(req, res) {
    try {
        const [asistencia, errorAsistencia] = await deleteAsistenciaService(req.params.idAsistencia);
        if (errorAsistencia) return handleErrorClient(res, 404, errorAsistencia);
        handleSuccess(res, 200, "Asistencia eliminada correctamente", asistencia);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}