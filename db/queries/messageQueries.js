const pool = require("../../config/database");

const getAllMessages = async () => {
  const { rows } = await pool.query(
  `SELECT messages.*, users.username 
     FROM messages 
     JOIN users ON messages.user_id = users.id
     WHERE messages.is_deleted = false`
  );
  return rows;
};

async function createMessage(userdata) {
  try {
    const { title, text, user_id } = userdata;
    const { rows } = await pool.query(
      `INSERT INTO messages (title, text,user_id ) values ($1,$2,$3) RETURNING *`,
      [title, text,user_id],
    );
    return rows[0];
  } catch (err) {
    throw new Error(`Error creating messages: ${err.message}`);
  }
}

async function deleteMessage(id) {
  try {
    await pool.query(`UPDATE messages SET is_deleted = true WHERE id = $1`, [
      id,
    ]);
  } catch {
    throw new Error(`Error deleting message: ${err.message}`);
  }
}

module.exports = { 
    getAllMessages,
    createMessage,
    deleteMessage,
};
