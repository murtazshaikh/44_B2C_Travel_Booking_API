import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) throw new Error('Missing token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // will contain the email
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
