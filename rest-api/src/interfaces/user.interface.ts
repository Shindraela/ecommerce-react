import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly username: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly country: string;
  readonly city: string;
  readonly address: {
    street: String;
    suite: String;
    zipcode: String;
  };
}
