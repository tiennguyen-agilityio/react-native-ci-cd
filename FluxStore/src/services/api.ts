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
  try {
    const response = await instanceAxios.get<T>(url, config);

    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const POST = async <T, P>(url: string, payload: P, config?: AxiosRequestConfig) => {
  try {
    const {data} = await instanceAxios.post<T>(url, payload, config);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};

export const PATCH = async <T, P>(url: string, payload: P, config?: AxiosRequestConfig) => {
  try {
    const {data} = await instanceAxios.patch<T>(API_URL + url, payload, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('Something was wrong');
  }
};
