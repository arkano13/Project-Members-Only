const { Router } = require("express");
const { validateMessage } = require("../middlewares/validationMiddleware");
const {
  getAllMessagesGet,
  createMessageGet,
  createMessagePost,
  deleteMessagePost,
} = require("../controllers/messageController");
const messageRouter = Router();

const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

messageRouter.get("/", getAllMessagesGet);
messageRouter.get("/new", isAuthenticated, createMessageGet);
messageRouter.post("/new", validateMessage,isAuthenticated,createMessagePost);
messageRouter.post("/:id/delete", isAdmin, deleteMessagePost);

module.exports = messageRouter;
