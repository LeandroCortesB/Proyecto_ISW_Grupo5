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
    .get("/data",authorizeRoles(["administrador", "profesor"]),getPagina)
    .post("/create",authorizeRoles(["administrador", "profesor"]), createPagina)
    .patch("/update",authorizeRoles(["administrador", "profesor"]),updatePagina)
    .delete("/del", authorizeRoles(["administrador", "profesor"]),deletePagina);

export default router;
