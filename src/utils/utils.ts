import axios, { AxiosError } from 'axios';
import HttpsStatusCode from 'src/constant/httpStatusCode.enum';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosErrorUnprocessableEntity<formError>(error: unknown): error is AxiosError<formError> {
  return isAxiosError(error) && error.response?.status === HttpsStatusCode.UnprocessableEntity;
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%';
