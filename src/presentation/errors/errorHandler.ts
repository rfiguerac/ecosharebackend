import { NextFunction, Request, Response } from "express";
import { HttpException } from "./httpException";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Comprueba si el error es una instancia de HttpException
  if (err instanceof HttpException) {
    return res.status(err.status).json({ message: err.message });
  }

  // Maneja otros errores no controlados
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}
