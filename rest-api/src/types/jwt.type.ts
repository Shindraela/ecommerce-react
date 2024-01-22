export type JwtType = {
  username: string;
  _id?: string;
  sub?: string;
  iat: number;
  exp: number;
};
