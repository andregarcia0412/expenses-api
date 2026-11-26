import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./docs/openapi.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import { router } from "./router.js";

const app = express();

app.use(express.json());
app.get("/api/v1/docs.json", (_req, res) => res.json(openApiDocument));
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/api/v1", router);
app.use(errorHandlerMiddleware);

export { app };
