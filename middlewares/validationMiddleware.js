const { body } = require("express-validator");

const validateRegister = [
  body("first_name")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage("the firts name is required"),
  body("last_name")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage("the last name is required"),
  body("username").trim().notEmpty().isEmail().withMessage("invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("minimum 6 characters"),
];

const validateLogin = [
  body("username").trim().notEmpty().withMessage("the email is required"),
  body("password").notEmpty().withMessage("the password is required"),
];

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 255 })
    .withMessage("the title is required"),
  body("text").trim().notEmpty().withMessage("the text is required"),
];

module.exports = { validateRegister, validateLogin, validateMessage };
