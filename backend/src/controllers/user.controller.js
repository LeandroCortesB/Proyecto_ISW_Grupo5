"use strict";
import {
  createUserService,
  deleteUserService,
  getAlumnosByApoderadoService,
  getAlumnosService,
  getUsersByAsignaturaService,
  getUsersByCursoService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/user.service.js";
import {
  userBodyValidation,
  userQueryValidation,
} from "../validations/user.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js"; // Ajusta el path según la estructura de tu proyecto


export async function getUser(req, res) {
  try {
    const { rut } = req.params;

    const { error } = userQueryValidation.validate({ rut });

    if (error) return handleErrorClient(res, 400, error.message);

    const [user, errorUser] = await getUserService({ rut });

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario encontrado", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsers(req, res) {
  try {
    const [users, errorUsers] = await getUsersService();

    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    users.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Usuarios encontrados", users);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function createUser(req, res) {
  try {
    const { rut, id, email, contraseña, rol } = req.body;

    const { error } = userQueryValidation.validate({ rut , id });

    if (error) return handleErrorClient(res, 400, "Error de validacion", error.message);

    const [user, errorUser] = await createUserService(req.body);

    if (errorUser) return handleErrorClient(res, 404, errorUser);

    handleSuccess(res, 200, "Usuario creado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAlumnos(req, res) {
  try {
    const [alumnos, errorUsers] = await getAlumnosService();
    if (errorUsers) return handleErrorClient(res, 404, errorUsers);

    alumnos.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Alumnos encontrados", alumnos);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateUser(req, res) {
  try {
    const { rut, id, email } = req.query;
    const { body } = req;

    const { error: queryError } = userQueryValidation.validate({
      rut,
      id,
      email,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = userBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [user, userError] = await updateUserService({ rut, id, email }, body);

    if (userError) return handleErrorClient(res, 400, "Error modificando al usuario", userError);

    handleSuccess(res, 200, "Usuario modificado correctamente", user);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const { rut, id, email } = req.query;

    const { error: queryError } = userQueryValidation.validate({
      rut,
      id,
      email,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [userDelete, errorUserDelete] = await deleteUserService({
      rut,
      id,
      email,
    });

    if (errorUserDelete) return handleErrorClient(res, 404, "Error eliminado al usuario", errorUserDelete);

    handleSuccess(res, 200, "Usuario eliminado correctamente", userDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getUsersByCurso(req, res) {
  try {
    const { idCurso } = req.params;
    const users = await getUsersByCursoService(idCurso);

    // Verifica que 'users' sea un array plano
    const usersLimpios = Array.isArray(users) ? users.flat() : [];

    if (usersLimpios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios para el curso especificado" });
    }

    // Envía la respuesta correctamente
    res.status(200).json({ data: usersLimpios });
  } catch (error) {
    console.error("Error al obtener usuarios por curso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function getUsersByAsignatura(req, res) {
    const { idAsignatura } = req.params;

    try {
        const [alumnos, error] = await getUsersByAsignaturaService(idAsignatura);

        if (error) {
            return res.status(400).json({ message: error });
        }

        return res.status(200).json({ data: alumnos });
    } catch (error) {
        console.error("Error al obtener usuarios por asignatura:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getAlumnosByApoderado(req, res) {
  try {
    const { Id } = req.params;
    const users = await getAlumnosByApoderadoService(Id);

    const usersLimpios = Array.isArray(users) ? users.flat() : [];

    if (usersLimpios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron alumnos para el apoderado indicado" });
    }

    res.status(200).json({ data: usersLimpios });
  } catch (error) {
    console.error("Error al obtener alumnos por apoderado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}