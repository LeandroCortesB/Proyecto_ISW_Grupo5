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
    .get("/detail/",getPagina)
    .post("/", createPagina)
    .patch("/detail/",updatePagina)
    .delete("/detail", deletePagina);

export default router;
