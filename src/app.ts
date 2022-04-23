import express from "express";
import { addLogger, errorHandler, notFoundHandler } from "./middlewares";

const app = express();

addLogger(app);

app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

app.all("*", notFoundHandler);
app.use(errorHandler);

export default app;
