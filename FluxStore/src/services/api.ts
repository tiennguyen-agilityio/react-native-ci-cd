import perf from '@react-native-firebase/perf';
import axios, {AxiosRequestConfig} from 'axios';

// const API_URL = 'https://react-native-zce1.onrender.com/';
const API_URL = 'https://61b189803c954f001722a9e5.mockapi.io/api/';

const defaultOptions = {
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
  },
};

const instanceAxios = axios.create(defaultOptions);

export const GET = async <T>(url: string, config?: AxiosRequestConfig) => {
  const trace = await perf().newHttpMetric(API_URL + url, 'GET');
  try {
    await trace.start();
    const response = await instanceAxios.get<T>(url, config);

    trace.setHttpResponseCode(response.status);
    trace.setResponseContentType(response.headers['content-type']);
    await trace.stop();
    return response?.data;
  } catch (error) {
    trace.setHttpResponseCode(error?.response?.status || 500);
    trace.putAttribute('error', JSON.stringify(trace));
    await trace.stop();

    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const POST = async <T, P>(url: string, payload: P, config?: AxiosRequestConfig) => {
  const trace = await perf().newHttpMetric(API_URL + url, 'POST');
  try {
    await trace.start();

    const response = await instanceAxios.post<T>(url, payload, config);

    trace.setHttpResponseCode(response?.status);
    trace.setResponseContentType(response?.headers['content-type']);
    await trace.stop();

    return response?.data;
  } catch (error: unknown) {
    trace.setHttpResponseCode(error?.response?.status || 500);
    trace.putAttribute('error', JSON.stringify(trace));
    await trace.stop();

    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const PATCH = async <T, P>(url: string, payload: P, config?: AxiosRequestConfig) => {
  const trace = await perf().newHttpMetric(API_URL + url, 'PATCH');

  try {
    await trace.start();

    const response = await instanceAxios.patch<T>(API_URL + url, payload, config);

    trace.setHttpResponseCode(response.status);
    trace.setResponseContentType(response.headers['content-type']);
    await trace.stop();

    return response?.data;
  } catch (error) {
    trace.setHttpResponseCode(error?.response?.status || 500);
    trace.putAttribute('error', JSON.stringify(trace));
    await trace.stop();

    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};
