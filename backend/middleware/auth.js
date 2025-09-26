import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Malformed Authorization header' });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // ✅ Consistency: expect { userId, email }
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}