import { Document } from 'mongoose';
import { Category } from './category.interface';

export interface Product extends Document {
  _id: string;
  category: Category;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: object;
}
