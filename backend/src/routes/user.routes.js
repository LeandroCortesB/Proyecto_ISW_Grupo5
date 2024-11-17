"use strict";
import { Router } from "express";
import { isAdmin, isProfesor } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin)
  .use(isProfesor);

router
  .get("/all", getUsers)
  .get("/data", getUser)
  .patch("/update", updateUser)
  .delete("/del", deleteUser);

export default router;