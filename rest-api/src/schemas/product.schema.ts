import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  image: String,
  price: Number,
  rating: Object,
});
