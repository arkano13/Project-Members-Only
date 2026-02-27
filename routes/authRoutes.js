const { Router } = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validationMiddleware");
const {
  registerGet,
  registerPost,
  logoutGet,
  loginGet,
} = require("../controllers/authControllers");
const passport = require("passport");
const authRouter = Router();

authRouter.get("/register", registerGet);
authRouter.post("/register", validateRegister, registerPost);
authRouter.get("/login", loginGet);
authRouter.post(
  "/login",
  validateLogin,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
authRouter.get("/logout", logoutGet);

module.exports = authRouter;

