import {useMutation} from '@tanstack/react-query';

// Constants
import {API_PATH} from '@/constants';

// Services
import {GET} from '@/services';

// Interface
import {LoginPayLoad, User} from '@/interfaces';

export const useAuth = () => {
  const logIn = useMutation({
    mutationFn: ({email, password}: LoginPayLoad) => {
      const url = `${API_PATH.USER}?email=${email}&password=${password}`;

      return GET<User[]>(url);
    },
  });
  return {logIn};
};
