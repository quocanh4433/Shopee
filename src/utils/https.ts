import HttpsStatusCode from 'src/constant/httpStatusCode.enum';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';
import { clearLS, setAccesTokenToLS, setProfileToLS } from './auth';
import { path } from 'src/constant/path';
import config from 'src/constant/config';

const https = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

https.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
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

    if (url === path.login || url === path.register) {
      const data = response.data as AuthResponse;
      const { access_token, user } = data.data;
      setAccesTokenToLS(access_token);
      setProfileToLS(user);
    } else if (url === path.logout) {
      clearLS();
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status !== HttpsStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data;
      const message = data?.message || error?.message;
      toast.error(message);
    }

    if (error.response?.status === HttpsStatusCode.Unauthorized) {
      clearLS();
    }
    return Promise.reject(error);
  }
);

export default https;
