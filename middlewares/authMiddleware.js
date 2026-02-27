const isAuthenticated = (req, res, next)=>{
  if (req.isAuthenticated()) {
      return next();
  }
    res.redirect("/login");
}

const isMember  = (req, res, next)=>{
  if (req.user && req.user.is_member) {
      return next();
  }
    res.redirect("/join");
}


const isAdmin   = (req, res, next)=>{
  if (req.user && req.user.is_admin) {
      return next();
  }
    res.redirect("/");
}

module.exports = { isAuthenticated, isMember, isAdmin };