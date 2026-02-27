const pool = require("../../config/database");

const getUsername = async (usernames)=>{
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [usernames]
    )
    return rows[0];
}

const getUserById = async (id)=>{
    const {rows} = await pool.query(
    "SELECT *, is_member::boolean, is_admin::boolean FROM users WHERE id = $1",
        [id ]
    )
    return rows[0];
}

async function createUser (userdata) {
    try{
        const {first_name, last_name, username, password }= userdata
        const { rows } = await pool.query( 
        `INSERT INTO users (first_name, last_name, username, password) VALUES ($1,$2,$3,$4) RETURNING *`,
        [first_name, last_name, username, password]
        );
        return rows[0];
    } catch (err) {
    throw new Error(`Error inserting author: ${err.message}`);
  }
    
}

async function updateMembership(id) {
  try {
    await pool.query(
      `UPDATE users SET is_member = true WHERE id = $1`, [id]
    );
  } catch (err) {
    throw new Error(`Error updating membership: ${err.message}`);
  }
}

async function updateAdmin (id) {
  try {
    await pool.query(
      `UPDATE users SET is_admin = true WHERE id = $1`, [id]
    );
  } catch (err) {
    throw new Error(`Error updating membership: ${err.message}`);
  }
}


module.exports = {
    getUsername,
    getUserById,
    createUser,
    updateMembership,
    updateAdmin,
 }