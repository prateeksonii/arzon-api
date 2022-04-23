import express from "express";
import usersRouter from "./api/v1/routes/usersRouter";
import { addLogger, errorHandler, notFoundHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

addLogger(app);

app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

app.use("/api/v1/users", usersRouter);

app.all("*", notFoundHandler);
app.use(errorHandler);

export default app;
