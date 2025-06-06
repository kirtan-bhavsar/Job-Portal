import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.name);
  if (err.name === "CastError") {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid MondoDB Id" });
  }
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ message: message });
};

export default errorHandlerMiddleware;
