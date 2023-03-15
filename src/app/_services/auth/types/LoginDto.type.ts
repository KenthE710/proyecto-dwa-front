import { User } from "./User.type";

export interface LoginDto {
  user: User;
  token: string;
}
