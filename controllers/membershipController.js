const { validationResult } = require("express-validator");
const {updateMembership,updateAdmin}=require("../db/queries/userQueries")


const joinGet= (req,res)=>{
        res.render("membership/join",{title: "Join Club", errors: []})
}

const joinPost = async (req, res) => {
  try {
    const { password } = req.body;
    if (password !== process.env.CLUB_PASSWORD) {
      return res.render("membership/join", {
        title: "Join Club",
        errors: [{ msg: "Contraseña incorrecta" }],
      });
    }
    await updateMembership(req.user.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).render("errors", {
      title: "Error",
      message: err.message,
    });
  }
};

const adminGet = (req, res) => {
  res.render("membership/admin", { title: "Become Admin", errors: [] });
};

const adminPost = async (req, res) => {
  try {
    const { password } = req.body;
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.render("membership/admin", {
        title: "Become Admin",
        errors: [{ msg: "Contraseña incorrecta" }],
      });
    }
    await updateAdmin(req.user.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).render("errors", {
      title: "Error",
      message: err.message,
    });
  }
};

module.exports = { joinGet, joinPost, adminGet, adminPost };
