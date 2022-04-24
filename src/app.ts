import express from "express";
import productsRouter from "./api/v1/routes/productsRouter";
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
app.use("/api/v1/products", productsRouter);

app.all("*", notFoundHandler);
app.use(errorHandler);

export default app;
