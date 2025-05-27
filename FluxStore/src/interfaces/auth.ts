import {User} from './user';

export interface AuthKey {
  auth_key: string;
  refresh_key: string;
}

export interface AuthResponse {
  status: boolean;
  data: {
    user: User;
  };
}

export interface LoginPayLoad {
  email: string;
  password: string;
}
