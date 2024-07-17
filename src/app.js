import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger.js";

// Routes import
import healthCheckRouter from "./routes/healthcheck.routes.js";

const app = express();

const morganFormat = ":method :url :status :response-time ms";

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use("/api/v1", healthCheckRouter);

export { app };
