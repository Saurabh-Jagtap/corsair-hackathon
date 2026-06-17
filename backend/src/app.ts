import express, {type Application, type Request, type Response, type NextFunction} from 'express'
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/ApiError.js';

import emailRoutes from './routes/email.routes.js'
import calendarRoutes from './routes/calendar.routes.js'
import connectRoutes from './routes/connect.routes.js'
import authRoutes from './routes/auth.routes.js'

const app:Application = express();

app.get('/', (req: Request, res: Response) => res.json({ message: "Hello from server",status: "ok" }))
app.get("/health", (req: Request, res: Response) => res.json({ status: "ok" }));

app.use(cookieParser());
app.use(express.json());
app.use('/api/gmail', emailRoutes)
app.use('/api/calendar', calendarRoutes)
app.use("/api/connect", connectRoutes)
app.use('/api/auth', authRoutes)

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default app;