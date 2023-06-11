import { ZodError } from "zod";
import { ValidationError, fromZodError } from "zod-validation-error";

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(...arguments);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const handleError = async (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: fromZodError(error).message,
    });
  }

  console.log(error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
