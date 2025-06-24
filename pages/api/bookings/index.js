import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../middleware/verifyToken';

export default async function handler(req, res) {
  let email;
  try {
    const decoded = verifyToken(req);
    email = decoded.email;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'GET') {
    const status = req.query.status;
    if (!['upcoming', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const today = new Date();
    const condition =
      status === 'upcoming'
        ? { last_travel_date: { $gte: today } }
        : { last_travel_date: { $lt: today } };

    const bookings = await db
      .collection('orders')
      .find({ user_email: email, ...condition })
      .toArray();

    return res.status(200).json(bookings);
  }

  if (req.method === 'POST') {
    const {
      destination,
      departure_city,
      start_date,
      end_date,
      highlights
    } = req.body;

    if (!destination || !start_date || !end_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = {
      user_email: email,
      destination,
      departure_city,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      last_travel_date: new Date(end_date),
      highlights: highlights || [],
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.collection('orders').insertOne(booking);
    return res.status(201).json({ message: 'Booking added', booking_id: result.insertedId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export const config = {
  api: {
    bodyParser: true
  }
};
