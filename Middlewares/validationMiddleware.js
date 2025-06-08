import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../Utils/constants.js";
import mongoose from "mongoose";
import Job from "../Models/Job.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be blank")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name should be between 3 to 50 characters long"),
]);

export const validateJob = withValidationErrors([
  body("company").trim().notEmpty().withMessage("Company is compulsary"),
  body("position").trim().notEmpty().withMessage("Position is compulsary"),
  body("location").trim().notEmpty().withMessage("Location is compulsary"),
  body("jobStatus")
    .trim()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Please select a valid job status"),
  body("jobType")
    .trim()
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Please select a valid job type"),
]);

export const validateId = withValidationErrors([
  param("id").custom(async (valueOfId) => {
    const isValidId = mongoose.Types.ObjectId.isValid(valueOfId);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");
    const job = await Job.findById(valueOfId);
    if (!job)
      throw new NotFoundError(`No job found with the id : ${valueOfId}`);
  }),
  // .withMessage("Invalid MongoDB Id"),
]);
