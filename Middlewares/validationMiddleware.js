import { body, validationResult, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../Errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, ROLE } from "../Utils/constants.js";
import mongoose from "mongoose";
import Job from "../Models/Job.js";
import User from "../Models/User.js";

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
        if (errorMessages[0].startsWith("Not Authorized")) {
          throw new UnauthenticatedError(errorMessages);
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
  param("id").custom(async (valueOfId, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(valueOfId);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB Id");
    const job = await Job.findById(valueOfId);
    if (!job)
      throw new NotFoundError(`No job found with the id : ${valueOfId}`);
    const isAdmin = req.body.role === "admin";
    const isOwner = req.user.id === job.user.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthenticatedError("Not authorized to access this route");
  }),
  // .withMessage("Invalid MongoDB Id"),
]);

export const userValidate = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name is compulsory"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is compulsory")
    .isEmail()
    .withMessage("Please provide a valid email id")
    .custom(async (email) => {
      const user = await User.findOne({ email: email });
      if (user)
        throw new BadRequestError("User already exists with this email id");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is compulsory")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters length"),
  body("lastName").trim(),
  body("location").trim().notEmpty().withMessage("Location is compulsory"),
  body("role")
    .trim()
    .isIn(Object.values(ROLE))
    .withMessage("User can only be admin or user"),
]);

export const loginValidate = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is compulsory")
    .isEmail()
    .withMessage("Please provide a valid email id"),
  body("password").trim().notEmpty().withMessage("Password is compulsory"),
]);

export const updateUserValidation = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name is compulsory"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is compulsory")
    .isEmail()
    .withMessage("Please provide a valid email id")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email: email });
      if (user && user.id !== req.user.id)
        // user.id !== req.user.id is checked that if the same password is kept, then we may get the user
        // but in that case that mail is valid that is why user.id !== req.user.id, then only throw error
        throw new BadRequestError("User already exists with this email id");
    }),
  body("lastName").trim(),
  body("location").trim().notEmpty().withMessage("Location is compulsory"),
]);
