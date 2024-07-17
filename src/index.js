import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({ path: "././src/.env" });

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION ERROR: ", error);
  });
