// pages/api/travellers/index.js

import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  let email;
  try {
    const decoded = verifyToken(req);
    email = decoded.email;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  const { full_name, age, passport_number } = req.body;

  if (!full_name || !age || !passport_number) {
    return res.status(400).json({ error: 'Missing required traveller fields' });
  }

  const client = await clientPromise;
  const db = client.db();

  const traveller = {
    user_email: email,
    full_name,
    age,
    passport_number,
    created_at: new Date(),
    updated_at: new Date()
  };

  const result = await db.collection('travellers').insertOne(traveller);

  res.status(201).json({ message: 'Traveller added', id: result.insertedId });
}

export const config = {
  api: {
    bodyParser: true
  }
};
