// models/User.js

export const getUserSchema = (data) => {
  return {
    full_name: data.full_name,
    email: data.email,
    password: data.password, // Hashed
    created_at: new Date(),
    updated_at: new Date()
  };
};
