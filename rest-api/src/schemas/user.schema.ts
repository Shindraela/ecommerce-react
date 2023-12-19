import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: Number,
  email: String,
  password: String,
  country: String,
  city: String,
  address: {
    street: String,
    suite: String,
    zipcode: String,
  },
});
