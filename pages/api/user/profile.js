// pages/api/user/profile.js

import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../middleware/verifyToken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  let email;

  try {
    const decoded = verifyToken(req);
    email = decoded.email;
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'GET') {
    const user = await db.collection('users').findOne({ email }, { projection: { password: 0 } });
    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const { full_name, password } = req.body;

    const updateData = {};
    if (full_name) updateData.full_name = full_name;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    await db.collection('users').updateOne({ email }, { $set: updateData });
    return res.status(200).json({ message: 'Profile updated' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: true
  }
};
