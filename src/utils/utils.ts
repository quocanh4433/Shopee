import axios, { AxiosError } from 'axios';
import HttpsStatusCode from 'src/constant/httpStatusCode.enum';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosErrorUnprocessableEntity<formError>(error: unknown): error is AxiosError<formError> {
  return isAxiosError(error) && error.response?.status === HttpsStatusCode.UnprocessableEntity;
}
