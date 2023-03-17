export interface SuccessResponseType<Data> {
  message: string;
  data: Data;
}

export interface ErrorResponseType<Data> {
  message: string;
  data?: Data;
}
