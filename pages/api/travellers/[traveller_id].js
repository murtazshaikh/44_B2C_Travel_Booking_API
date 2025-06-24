// pages/api/travellers/[traveller_id].js

import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../middleware/verifyToken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { traveller_id } = req.query;

  let email;
  try {
    const decoded = verifyToken(req);
    email = decoded.email;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'PUT') {
    const { full_name, age, passport_number } = req.body;

    const updateData = {
      ...(full_name && { full_name }),
      ...(age && { age }),
      ...(passport_number && { passport_number }),
      updated_at: new Date()
    };

    await db.collection('travellers').updateOne(
      { _id: new ObjectId(traveller_id), user_email: email },
      { $set: updateData }
    );

    return res.status(200).json({ message: 'Traveller updated' });
  }

  if (req.method === 'DELETE') {
    await db.collection('travellers').deleteOne({
      _id: new ObjectId(traveller_id),
      user_email: email
    });

    return res.status(200).json({ message: 'Traveller deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: true
  }
};
