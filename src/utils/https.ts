import HttpsStatusCode from 'src/constant/httpStatusCode.enum';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type';
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth';
import config from 'src/constant/config';
import { isAxiosExpireTokenError, isAxiosUnauthorizedError } from './utils';
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api';
import { string } from 'yup';
import { ErrorResponseType } from 'src/types/utils.type';

const https = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'expire-access-token': 10,
    'expire-refresh-token': 60 * 60
  },
  timeout: 10000
});

const handleRefreshToken = () => {
  const refreshToken = getRefreshTokenFromLS();
  return https
    .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
      refresh_token: refreshToken
    })
    .then((res) => {
      const { access_token } = res.data.data;
      setAccessTokenToLS(access_token);
      return access_token;
    })
    .catch((err) => {
      console.log('ERROR');
      clearLS();
      throw err;
    });
};

https.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromLS();

    if (accessToken) {
      config.headers.Authorization = accessToken;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  (response) => {
    const { url } = response.config;

    if (url === URL_LOGIN || url === URL_REGISTER) {
      const data = response.data as AuthResponse;
      const { access_token, user, refresh_token } = data.data;
      setAccessTokenToLS(access_token);
      setRefreshTokenToLS(refresh_token);
      setProfileToLS(user);
    } else if (url === URL_LOGOUT) {
      clearLS();
    }

    return response;
  },
  (error: AxiosError) => {
    if (
      ![HttpsStatusCode.UnprocessableEntity, HttpsStatusCode.Unauthorized].includes(error.response?.status as number)
    ) {
      // Chỉ toast lỗi không phải 422 và 401
      const data: any | undefined = error.response?.data;
      const message = data?.message || error?.message;
      toast.error(message);
    }

    /**
     * Lỗi unauthorized có rất nhiều trường hợp
     *
     * - Không truyền token
     * - Token không đúng
     * - Token hết hạn (*)
     *
     */

    if (isAxiosUnauthorizedError<ErrorResponseType<{ name: string; message: string }>>(error)) {
      const config = error?.response?.config;
      const urlError = config?.url;
      /**
       * Xử lí refresh_token khi token hết hạn và request không phải của refresh_token
       */
      if (isAxiosExpireTokenError(error) && urlError !== URL_REFRESH_TOKEN) {
        return handleRefreshToken().then((res) => {
          // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
          return https({ ...config, headers: { ...config?.headers, Authorization: res } });
        });
      }
      clearLS();
      toast.error(error?.response?.data?.data?.message || error?.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export default https;
