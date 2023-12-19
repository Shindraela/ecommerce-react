import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstname: string;
  readonly lastname: string;
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
