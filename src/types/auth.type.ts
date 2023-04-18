import { User } from './user.type';
import { SuccessResponseType } from './utils.type';

export type AuthResponse = SuccessResponseType<{
  access_token: string;
  refresh_token: string;
  expire_refresh_token: number;
  expires: string;
  user: User;
}>;

export type RefreshTokenResponse = SuccessResponseType<{
  access_token: string;
}>;
