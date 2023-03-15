import HttpsStatusCode from 'src/constant/httpStatusCode.enum';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const https = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

https.interceptors.response.use(
  (response) => {
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
