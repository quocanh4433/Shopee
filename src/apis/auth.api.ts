import { AuthResponse } from 'src/types/auth.type';
import https from 'src/utils/https';

export const logoutApi = () => https.post<AuthResponse>('/logout');
export const loginApi = (body: { email: string; password: string }) => https.post<AuthResponse>('/login', body);
export const registerApi = (body: { email: string; password: string }) => https.post<AuthResponse>('/register', body);
