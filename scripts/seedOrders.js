// scripts/seedOrders.js (Run with node)

import clientPromise from '../lib/mongodb.js';

const orders = [
  {
    user_email: 'robin@example.com',
    destination: 'Dubai',
    start_date: new Date('2025-06-10'),
    end_date: new Date('2025-06-15'),
    last_travel_date: new Date('2025-06-15'),
    highlights: ['Hotel', 'Flight']
  },
  {
    user_email: 'robin@example.com',
    destination: 'London',
    start_date: new Date('2024-01-05'),
    end_date: new Date('2024-01-10'),
    last_travel_date: new Date('2024-01-10'),
    highlights: ['Hotel']
  }
];

const seed = async () => {
  const client = await clientPromise;
  const db = client.db();
  await db.collection('orders').insertMany(orders);
  console.log('Orders seeded!');
  process.exit();
};

seed();
