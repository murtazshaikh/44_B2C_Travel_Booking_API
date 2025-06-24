// models/Order.js

export const getOrderSchema = (data) => {
  return {
    user_id: data.user_id, // ObjectId
    destination: data.destination,
    departure_city: data.departure_city,
    start_date: data.start_date,
    end_date: data.end_date,
    last_travel_date: data.end_date, // for filtering upcoming/completed
    highlights: data.highlights || [],
    created_at: new Date(),
    updated_at: new Date()
  };
};
