import Router from "express";
import { sendCustomEmail } from "../controllers/email.controller.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt)

router.post("/send",authorizeRoles(["administrador", "profesor"]),sendCustomEmail);

export default router;