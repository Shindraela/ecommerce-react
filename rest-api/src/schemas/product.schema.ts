import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  category: Object,
  title: String,
  description: String,
  image: String,
  price: Number,
  rating: Object,
});
