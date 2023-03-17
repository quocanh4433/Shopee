import { User } from './user.type';
import { SuccessResponseType } from './utils.type';

export type AuthResponse = SuccessResponseType<{
  access_token: string;
  expires: string;
  user: User;
}>;
