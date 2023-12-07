import { Mongoose } from 'mongoose';
import { CategorySchema } from '../schemas/category.schema';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Category', CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
