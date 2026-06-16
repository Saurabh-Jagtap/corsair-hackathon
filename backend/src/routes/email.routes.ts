import { Router } from "express";
import { getThreadsController } from "../controllers/email.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router:Router = Router()

router.get('/threads', getThreadsController)

export default router