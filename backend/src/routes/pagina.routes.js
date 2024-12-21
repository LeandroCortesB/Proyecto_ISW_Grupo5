"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createPagina,
  deletePagina,
  getPagina,
  updatePagina
} from "../controllers/pagina.controller.js";

const router = Router();

router.use(authenticateJwt);

router
    .get("/:rut",authorizeRoles(["administrador", "profesor"]),getPagina)
    .post("/",authorizeRoles(["administrador", "profesor"]), createPagina)
    .patch("/update/:rut",authorizeRoles(["administrador", "profesor"]),updatePagina)
    .delete("/del/:rut", authorizeRoles(["administrador", "profesor"]),deletePagina);

export default router;
