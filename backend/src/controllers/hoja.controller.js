"use strict";
import {
  createHojaService,
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
    const { rut } = req.body;

    const [hojas, errorHojas] = await getHojasService(rut);

    if (errorHojas) return handleErrorClient(res, 404, errorHojas);

    hojas.length === 0
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

export async function createHoja(req, res) {
  try {

    const { error } = hojaBodyValidation.validate(req.body);

    if (error) return handleErrorClient(res, 400, "Error de validacion", error.message);

    const [hoja, errorHoja] = await createHojaService(req.body);

    if (errorHoja) return handleErrorClient(res, 404, errorHoja);

    handleSuccess(res, 200, "Hoja de vida creada correctamente", hoja);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateHoja(req, res) {
  try {
    
    const { body } = req;
    const idHoja = body.idHoja

    const { error: queryError } = hojaQueryValidation.validate({
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

    const [hoja, hojaError] = await updateHojaService({ idHoja }, body);

    if (hojaError) return handleErrorClient(res, 400, "Error modificando la hoja de vida", hojaError);

    handleSuccess(res, 200, "Hoja de vida modificada correctamente", hoja);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteHoja(req, res) {
  try {
    const { idHoja } = req;
    console.log("req ",req.body);
    console.log("res ",res.body);
    console.log("IdDel ",idHoja);

    const { error: queryError } = hojaQueryValidation.validate({
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
      idHoja,
    });

    if (errorHojaDelete) return handleErrorClient(res, 404, "Error eliminado la hoja de vida", errorHojaDelete);

    handleSuccess(res, 200, "Hoja de vida eliminada correctamente", hojaDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
