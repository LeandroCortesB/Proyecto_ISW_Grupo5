"use strict";
import {
  createPaginaService,  
  deletePaginaService,
  getPaginaService,
  updatePaginaService,
} from "../services/pagina.service.js";
import {
  paginaBodyValidation,
  paginaQueryValidation,
} from "../validations/pagina.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getPagina(req, res) {
  try {
    const { id } = req.query;

    const { error } = paginaQueryValidation.validate( id );

    if (error) return handleErrorClient(res, 400, error.message);

    const [pagina, errorPagina] = await getPaginaService( id );

    if (errorPagina) return handleErrorClient(res, 404, errorPagina);

    handleSuccess(res, 200, "Pagina encontrada", pagina);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createPagina(req, res) {
    try {
      const { error: bodyError } = paginaBodyValidation.validate(req.body);
      
      if (bodyError)
        return handleErrorClient(
          res,
          400,
          "Error de validación en los datos enviados",
          bodyError.message,
        );
  
        const [nuevaPagina, error] = await createPaginaService(req.body);
        if (error) return handleErrorClient(res, 400, error);
  
      handleSuccess(res, 201, "Pagina creada exitosamente", nuevaPagina);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }

export async function updatePagina(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = paginaQueryValidation.validate({
      id
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = paginaBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [pagina, paginaError] = await updatePaginaService( id , body);

    if (paginaError) return handleErrorClient(res, 400, "Error modificando la pagina", paginaError);

    handleSuccess(res, 200, "Pagina modificada correctamente", pagina);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deletePagina(req, res) {
  try {
    const { id } = req.query;

    const { error: queryError } = paginaQueryValidation.validate({
      id
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [paginaDelete, errorPaginaDelete] = await deletePaginaService({
      id
    });

    if (errorPaginaDelete) return handleErrorClient(res, 404, "Error eliminado la pagina", errorPaginaDelete);

    handleSuccess(res, 200, "Pagina eliminada correctamente", paginaDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}