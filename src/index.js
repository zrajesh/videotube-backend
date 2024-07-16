import morgan from "morgan";
import logger from "./utils/logger.js";

const app = express();
const port = process.env.PORT || 5000;

const morganFormat = ":method :url :status :response-time ms";

// Middlewares
app.use(express.json());
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
