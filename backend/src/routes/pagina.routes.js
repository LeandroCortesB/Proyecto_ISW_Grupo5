"use strict";
import { Router } from "express";
import { isProfesor } from "../middlewares/authorization.middleware.js";
import {
  createPagina,
  deletePagina,
  getPagina,
  updatePagina
} from "../controllers/pagina.controller.js";

const router = Router();

router
    .use(isProfesor);

router
    .get("/data",getPagina)
    .post("/create", createPagina)
    .patch("/update",updatePagina)
    .delete("/del", deletePagina);

export default router;
