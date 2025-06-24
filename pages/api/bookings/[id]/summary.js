// pages/api/bookings/[id]/summary.js

import clientPromise from "../../../../lib/mongodb";
import { verifyToken } from "../../../../middleware/verifyToken";
import { ObjectId } from "mongodb";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  let email;
  try {
    const decoded = verifyToken(req);
    email = decoded.email;
  } catch (err) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }

  const bookingId = req.query.id;

  const client = await clientPromise;
  const db = client.db();

  const booking = await db.collection("orders").findOne({
    _id: new ObjectId(bookingId),
    user_email: email,
  });

  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  try {
    const prompt = `Write a friendly booking summary:\n\nYou’re traveling to ${
      booking.destination
    } from ${booking.departure_city} on ${new Date(
      booking.start_date
    ).toDateString()} to ${new Date(
      booking.end_date
    ).toDateString()}. Your booking includes ${booking.highlights.join(", ")}.`;

    console.log("Sending prompt to OpenAI:", prompt);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful booking assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 100,
    });

    const summary = response.choices[0].message.content.trim();

    res.status(200).json({ summary });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
