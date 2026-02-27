const { validationResult } = require("express-validator");
const { getAllMessages, createMessage, deleteMessage,} = require("../db/queries/messageQueries");

const getAllMessagesGet = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.render("messages/index", { title: "message board",messages, errors: [] });
  } catch (err) {
    res.status(500).render("errors", {
      title: "Error",
      message: err.message,
    });
  }
};

const createMessageGet = (req, res) => {
  res.render("messages/new", { title: "New Message", errors: [] });
};

const createMessagePost = async (req, res) => {
    console.log(req.body); // agrega esto
        console.log(req.user); // agrega esto
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("messages/new", {
      title: "New Message",
      errors: errors.array(),
    });
  }
  try {
    const { title, text } = req.body;
    await createMessage({
      title,
      text,
      user_id: req.user.id,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).render("errors", {
      title: "Error",
      message: err.message,
    });
  }
};

const deleteMessagePost = async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).render("errors", {
      title: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  getAllMessagesGet,
  createMessageGet,
  createMessagePost,
  deleteMessagePost,
};
