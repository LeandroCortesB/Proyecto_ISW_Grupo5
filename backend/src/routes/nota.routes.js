"use strict";
import { Router } from "express";
import {
  createNota,
  deleteNota,
  getNota,
  getNotas,
  updateNota,
} from "../controllers/nota.controller.js";

const router = Router();

router
  .get("/all", getNotas)         
  .get("/data", getNota)      
  .post("/create", createNota)       
  .patch("/update", updateNota) 
  .delete("/delete", deleteNota); 

export default router;

