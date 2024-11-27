"use strict";
import {
  createCursoService,
  deleteCursoService,
  getCursoService,
  getCursosService,
  updateCursoService,
} from "../services/curso.service.js";
import {
  cursoBodyValidation,
  cursoQueryValidation,
} from "../validations/curso.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getCurso(req, res) {
  try {
    const { idCurso } = req.params;

    const { error } = cursoQueryValidation.validate({ idCurso });

    if (error) return handleErrorClient(res, 400, error.message);

    const [curso, errorCurso] = await getCursoService({ idCurso });

    if (errorCurso) return handleErrorClient(res, 404, errorCurso);

    handleSuccess(res, 200, "Curso encontrado", curso);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getCursos(req, res) {
  try {
    const [cursos, errorCursos] = await getCursosService();

    if (errorCursos) return handleErrorClient(res, 404, errorCursos);

    cursos.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Cursos encontrados", cursos);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createCurso(req, res) {
    try {
      const { error } = cursoBodyValidation.validate(req.body);
  
      if (error) return handleErrorClient(res, 400, "Error de validación", error.message);
  
      const [curso, errorCurso] = await createCursoService(req.body);
  
      if (errorCurso) return handleErrorClient(res, 400, errorCurso);
  
      handleSuccess(res, 201, "Curso creado correctamente", curso);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }
  

export async function updateCurso(req, res) {
  try {
    const { idCurso, nombreCurso } = req.params;
    const { body } = req;

    const { error: queryError } = cursoQueryValidation.validate({
      idCurso,
      nombreCurso,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = cursoBodyValidation.validate(body);

    if (bodyError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );
    }

    const [curso, cursoError] = await updateCursoService(
      { idCurso, nombreCurso },
      body,
    );

    if (cursoError) return handleErrorClient(res, 400, "Error modificando el curso", cursoError);

    handleSuccess(res, 200, "Curso modificado correctamente", curso);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteCurso(req, res) {
  try {
    const { idCurso, nombreCurso } = req.params;

    const { error: queryError } = cursoQueryValidation.validate({
      idCurso,
      nombreCurso,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [cursoDeleted, errorCursoDeleted] = await deleteCursoService({
      idCurso,
      nombreCurso,
    });

    if (errorCursoDeleted) return handleErrorClient(res, 404, "Error eliminando el curso", errorCursoDeleted);

    handleSuccess(res, 200, "Curso eliminado correctamente", cursoDeleted);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
