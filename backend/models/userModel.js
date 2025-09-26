import db from '../db/index.js';

// 🔹 Lookup user by email (safe fields only)
export async function findUserByEmail(email) {
  const res = await db.query(
    'SELECT id, name, email, created_at FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
}

// 🔹 Lookup user for login (includes password hash)
export async function findUserForLogin(email) {
  const res = await db.query(
    'SELECT id, email, password FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
}

// 🔹 Create a new user
export async function createUser({ name, email, hashedPassword }) {
  const res = await db.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, hashedPassword]
  );
  return res.rows[0];
}

// 🔹 Get user by ID (safe fields only)
export async function getUserById(id) {
  const res = await db.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id]
  );
  return res.rows[0];
}