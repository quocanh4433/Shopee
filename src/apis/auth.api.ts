import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type';
import https from 'src/utils/https';

export const URL_LOGIN = 'login';
export const URL_LOGOUT = 'logout';
export const URL_REGISTER = 'register';
export const URL_REFRESH_TOKEN = 'refresh-access-token';

const authApi = {
  logoutApi: () => https.post<AuthResponse>(URL_LOGOUT),
  loginApi: (body: { email: string; password: string }) => https.post<AuthResponse>(URL_LOGIN, body),
  registerApi: (body: { email: string; password: string }) => https.post<AuthResponse>(URL_REGISTER, body),
  refreshTokenApi: (body: { refresh_token: string }) => https.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, body)
};

export default authApi;
