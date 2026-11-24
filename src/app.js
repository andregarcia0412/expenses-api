import express from "express";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import { router } from "./router.js";

const app = express();

app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandlerMiddleware);

export { app };
