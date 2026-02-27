const { Router } = require("express");
const { joinGet, joinPost, adminGet, adminPost } = require("../controllers/membershipController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const membershipRouter = Router();

membershipRouter.get("/join", isAuthenticated, joinGet);
membershipRouter.post("/join", isAuthenticated, joinPost);
membershipRouter.get("/admin", isAuthenticated, adminGet);
membershipRouter.post("/admin", isAuthenticated, adminPost);


module.exports = membershipRouter;