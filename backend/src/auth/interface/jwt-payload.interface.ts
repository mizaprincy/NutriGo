export interface JwtPayload {
  user_id: number;
  email: string;
  first_name: string | null;
  last_name: string;
  role: string;
}
