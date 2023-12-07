import { Document } from 'mongoose';

export interface Product extends Document {
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly rating: object;
}
