import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  creationAt: String,
  updatedAt: String,
});
