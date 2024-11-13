"use strict";
import {
  createNotaService,
  deleteNotaService,
  getNotaService,
  getNotasService,
  updateNotaService,
} from "../services/nota.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getNota(req, res) {
  try {
    const { idNota } = req.query;
    const [nota, error] = await getNotaService({ idNota });

    if (error) return handleErrorClient(res, 404, error);
    handleSuccess(res, 200, "Nota encontrada", nota);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getNotas(req, res) {
  try {
    const [notas, error] = await getNotasService();
    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Notas encontradas", notas);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createNota(req, res) {
  try {
    const [nuevaNota, error] = await createNotaService(req.body);
    if (error) return handleErrorClient(res, 400, error);

    handleSuccess(res, 201, "Nota creada exitosamente", nuevaNota);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateNota(req, res) {
  try {
    const { idNota } = req.query;
    const [nota, error] = await updateNotaService(idNota, req.body);

    if (error) return handleErrorClient(res, 404, error);
    handleSuccess(res, 200, "Nota actualizada correctamente", nota);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteNota(req, res) {
  try {
    const { idNota } = req.query;
    const [notaDeleted, error] = await deleteNotaService(idNota);

    if (error) return handleErrorClient(res, 404, error);
    handleSuccess(res, 200, "Nota eliminada correctamente", notaDeleted);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
