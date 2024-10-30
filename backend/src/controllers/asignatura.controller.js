"use strict";
import {
    createAsignaturaService,
    deleteAsignaturaService,
    getAsignaturaService,
    getAsignaturasService,
    updateAsignaturaService,
} from "../services/asignatura.service.js";
import {
    asignaturaBodyValidation,
    asignaturaQueryValidation,
} from "../validations/asignatura.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getAsignatura(req, res) {
    try {
        const { idAsignatura, nombreAsignatura } = req.query;

        const { error } = asignaturaQueryValidation.validate({ idAsignatura, nombreAsignatura });

        if (error) return handleErrorClient(res, 400, error.message);

        const [asignatura, errorAsignatura] = await getAsignaturaService({ idAsignatura, nombreAsignatura });

        if (errorAsignatura) return handleErrorClient(res, 404, errorAsignatura);

        handleSuccess(res, 200, "Asignatura encontrada", asignatura);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAsignaturas(req, res) {
    try {
        const [asignaturas, errorAsignaturas] = await getAsignaturasService();

        if (errorAsignaturas) return handleErrorClient(res, 404, errorAsignaturas);

        handleSuccess(res, 200, "Asignaturas encontradas", asignaturas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createAsignatura(req, res) {
    try {
        const { error } = asignaturaBodyValidation.validate(req.body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [asignatura, errorAsignatura] = await createAsignaturaService(req.body);

        if (errorAsignatura) return handleErrorClient(res, 400, errorAsignatura);

        handleSuccess(res, 201, "Asignatura creada correctamente", asignatura);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateAsignatura(req, res) {
    try {
        const { idAsignatura, nombreAsignatura } = req.query;
        const { body } = req;

        const { error } = asignaturaQueryValidation.validate({ idAsignatura, nombreAsignatura });

        if (error) return handleErrorClient(res, 400, error.message);

        const [asignatura, errorAsignatura] = await updateAsignaturaService({ idAsignatura, nombreAsignatura }, body);

        if (errorAsignatura) return handleErrorClient(res, 400, errorAsignatura);

        handleSuccess(res, 200, "Asignatura actualizada correctamente", asignatura);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteAsignatura(req, res) {
    try {
        const { idAsignatura, nombreAsignatura } = req.query;

        const { error } = asignaturaQueryValidation.validate({ idAsignatura, nombreAsignatura });

        if (error) return handleErrorClient(res, 400, error.message);

        const [asignatura, errorAsignatura] = await deleteAsignaturaService({ idAsignatura, nombreAsignatura });

        if (errorAsignatura) return handleErrorClient(res, 404, errorAsignatura);

        handleSuccess(res, 200, "Asignatura eliminada correctamente", asignatura);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
