import type { ErrorRequestHandler, Express, RequestHandler } from "express";
import status from "http-status";
import expressWinston from "express-winston";
import winston from "winston";
import * as Transport from "winston-transport";

export const addLogger = (app: Express) => {
  const loggerTransports: Transport[] = [
    new winston.transports.File({
      dirname: "logs",
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({ dirname: "logs", filename: "combined.log" }),
  ];

  if (process.env.NODE_ENV !== "production") {
    loggerTransports.push(new winston.transports.Console());
  }

  app.use(
    expressWinston.logger({
      transports: loggerTransports,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: true,
    })
  );
};

export const notFoundHandler: RequestHandler = (_req, res, next) => {
  res.status(status.NOT_FOUND);
  return next(new Error("Route not found"));
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  _next
) => {
  if (res.statusCode === status.OK) {
    res.status(status.INTERNAL_SERVER_ERROR);
  }

  return res.json({
    ok: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : {},
    },
  });
};
