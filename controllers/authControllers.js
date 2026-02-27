const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { createUser } = require("../db/queries/userQueries");

const registerGet = (req, res) => {
  res.render("auth/register", { title: "register", errors: [] });
};

const registerPost = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.render("auth/register", {
      title: "Register",
      errors: errors.array(),
    });
  }
  try {
    const { first_name, last_name, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await createUser({
      first_name,
      last_name,
      username,
      password: hashPassword,
    });
    res.redirect("/login");
    } catch (err) {
      res.status(500).render("errors", {
        title: "Error",
        message: err.message,
      });
    }
};

const loginGet = (req, res) => {
  res.render("auth/login", { title: "login", errors: [] });
};

const logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};

module.exports = { registerGet, registerPost, logoutGet, loginGet };
