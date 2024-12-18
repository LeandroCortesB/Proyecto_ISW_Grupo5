"use strict";
import {
    createAsistenciaService,
    deleteAsistenciaService,
    getAsistenciaByAlumnoService,
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
        const asistencia = await createAsistenciaService(req.body);
        handleSuccess(res, 201, "Asistencia creada correctamente", asistencia);
    } catch (error) {
        console.error("Error capturado en createAsistencia:", error.message);

        // Verifica si el error es por duplicado y devuelve un 400 con un mensaje claro
        if (error.message.includes("registrada")) {
            return res.status(400).json({
                message: "El alumno ya presenta una asistencia para esta fecha y asignatura.",
            });
        }

        // Para otros errores, devuelve 500
        return res.status(500).json({
            message: "Error interno del servidor.",
        });
    }
}


export async function updateAsistencia(req, res) {
    try {
        const { fecha, asistio } = req.body; // Asegúrate de usar las propiedades correctas
        const asistenciaActualizada = {
            fecha,      // Mapea correctamente los datos
            asistio,    // Presente o Ausente
        };

        const [asistencia, errorAsistencia] = 
        await updateAsistenciaService(req.params.idAsistencia, asistenciaActualizada);
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

export async function getAsistenciaByAlumno(req, res) {
  try {
    const { rut } = req.params; 
    const { fechaInicio, fechaFin, idAsignatura } = req.query;

    if (!rut || !fechaInicio || !fechaFin) {
      return handleErrorClient(res, 400, "ID del alumno, fecha inicio y fecha fin son obligatorios.");
    }

    const [asistencias, error] = await getAsistenciaByAlumnoService(
      rut,
      fechaInicio,
      fechaFin,
      idAsignatura
    );

    if (error) return handleErrorClient(res, 404, error);


    const totalAsistencias = asistencias.length;
    const totalPresente = asistencias.filter((a) => a.asistio).length;
    const totalAusente = totalAsistencias - totalPresente;

    const response = {
      totalAsistencias,
      totalPresente,
      totalAusente,
      porcentajePresente: ((totalPresente / totalAsistencias) * 100).toFixed(2),
      porcentajeAusente: ((totalAusente / totalAsistencias) * 100).toFixed(2),
    };

    handleSuccess(res, 200, "Asistencias obtenidas correctamente.", response);
  } catch (error) {
    console.error("Error en getAsistenciaByAlumno:", error.message);
    handleErrorServer(res, 500, "Error interno del servidor.");
  }
}