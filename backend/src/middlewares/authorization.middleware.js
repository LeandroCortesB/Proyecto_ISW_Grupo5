import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
  handleErrorClient,
  handleErrorServer,
} from "../handlers/responseHandlers.js";

export function authorizeRoles(allowedRoles) {
  return async (req, res, next) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const userFound = await userRepository.findOneBy({ email: req.user.email });

      if (!userFound) {
        return handleErrorClient(
          res,
          404,
          "Usuario no encontrado en la base de datos"
        );
      }

      const rolUser = userFound.rol;

      if (!allowedRoles.includes(rolUser)) {
        return handleErrorClient(
          res,
          403,
          "Error al acceder al recurso",
          `Se requiere uno de los siguientes roles: ${allowedRoles.join(", ")}`
        );
      }

      next();
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  };
}
