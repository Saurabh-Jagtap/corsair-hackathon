import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCalendarEvents } from "../controllers/calendar.controllers.js";

const router: Router = Router()

router.get('/events',authMiddleware, getCalendarEvents)

export default router
