import { AuthResponse } from 'src/types/auth.type';
import https from 'src/utils/https';

export const registerAccount = (body: { email: string; password: string }) =>
  https.post<AuthResponse>('/register', body);

export const loginAccount = (body: { email: string; password: string }) => https.post<AuthResponse>('/login', body);
