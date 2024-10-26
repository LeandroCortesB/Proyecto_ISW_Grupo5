"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import hojaRoutes from "./hoja.routes.js"

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/hoja", hojaRoutes)
    .use("/user", userRoutes);

export default router;