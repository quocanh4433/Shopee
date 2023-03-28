import { AuthResponse } from 'src/types/auth.type';
import https from 'src/utils/https';

const authApi = {
  logoutApi: () => https.post<AuthResponse>('/logout'),
  loginApi: (body: { email: string; password: string }) => https.post<AuthResponse>('/login', body),
  registerApi: (body: { email: string; password: string }) => https.post<AuthResponse>('/register', body)
};

export default authApi;
