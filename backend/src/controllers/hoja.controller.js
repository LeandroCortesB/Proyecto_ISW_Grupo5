"use strict";
import {
  deleteHojaService,
  getHojaService,
  getHojasService,
  updateHojaService,
} from "../services/hoja.service.js";
import {
  hojaBodyValidation,
  hojaQueryValidation,
} from "../validations/hoja.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getHoja(req, res) {
  try {
    const { rut, idHoja } = req.query;

    const { error } = hojaQueryValidation.validate({ rut, idHoja });

    if (error) return handleErrorClient(res, 400, error.message);

    const [hoja, errorHoja] = await getHojaService({ rut, idHoja });

    if (errorHoja) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Hoja de vida encontrada", hoja);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getHojas(req, res) {
  try {
    const [hojas, errorHojas] = await getHojasService();

    if (errorHojas) return handleErrorClient(res, 404, errorHojas);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Hojas de vida encontradas", hojas);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateHoja(req, res) {
  try {
    const { rut, idHoja } = req.query;
    const { body } = req;

    const { error: queryError } = hojaQueryValidation.validate({
      rut,
      id,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = hojaBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [hoja, hojaError] = await updateHojaService({ rut, idHoja }, body);

    if (hojaError) return handleErrorClient(res, 400, "Error modificando la hoja de vida", hojaError);

    handleSuccess(res, 200, "Hoja de vida modificada correctamente", hoja);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteHoja(req, res) {
  try {
    const { rut, idHoja } = req.query;

    const { error: queryError } = hojaQueryValidation.validate({
      rut,
      idHoja,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [hojaDelete, errorHojaDelete] = await deleteHojaService({
      rut,
      idHoja,
    });

    if (errorHojaDelete) return handleErrorClient(res, 404, "Error eliminado la hoja de vida", errorHojaDelete);

    handleSuccess(res, 200, "Hoja de vida eliminada correctamente", hojaDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}