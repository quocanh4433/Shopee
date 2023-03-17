import HttpsStatusCode from 'src/constant/httpStatusCode.enum';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';
import { clearAccessTokenFromLS, saveAccesTokenToLS } from './auth';

const https = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
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

    if (url === '/login' || url === '/register') {
      const { access_token } = (response.data as AuthResponse).data;
      saveAccesTokenToLS(access_token);
    } else if (url === '/logout') {
      clearAccessTokenFromLS();
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status !== HttpsStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data;
      const message = data?.message || error?.message;
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default https;
