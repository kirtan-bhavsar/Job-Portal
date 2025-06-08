import { body, validationResult } from "express-validator";
import { BadRequestError } from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../Utils/constants.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
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
