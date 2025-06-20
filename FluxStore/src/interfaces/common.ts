import {AxiosRequestConfig} from 'axios';

export interface AxiosResponse<T = object> {
  data: T;
  status: number;
  statusText: string;
  headers: object;
  config: AxiosRequestConfig;
  request?: object;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
}

export interface Result<T> {
  status?: boolean;
  data?: T;
  error?: string;
}
