const express = require('express');
const session = require("express-session");
require("./config/passport"); 
require("dotenv").config();

const app = express();
const path= require('path');
const pool = require("./config/database");

const routerAut = require("./routes/authRoutes");
const routerMembership=require("./routes/membershipRoutes");
const routerMessage= require("./routes/messageRoutes");

const pgSession = require("connect-pg-simple")(session);

const passport = require('passport');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

const assetsPath = path.join(__dirname, "public/css");
app.use(express.static(assetsPath));

app.use(session({
    store: new pgSession({pool}),
    secret: process.env.SECRETS,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user
  next();
});

app.use("/", routerAut);
app.use("/", routerMembership);
app.use("/", routerMessage);



const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error starting server:", error);
    throw error;
  }
    console.log(`Server running on http://localhost:${PORT}`);
});
