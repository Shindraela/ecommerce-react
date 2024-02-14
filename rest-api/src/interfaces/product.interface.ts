import { Document } from 'mongoose';
import { Category } from './category.interface';

export interface Product extends Document {
  readonly _id: string;
  readonly category: Category;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly rating: object;
}
