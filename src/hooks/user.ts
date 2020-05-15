import { useState } from 'react';
import { User } from '../models/User';

interface Status {
  logged: boolean;
}

export const useUser = (): [User | undefined, Status] => {
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<Status>({ logged: false });

  return [user, status];
};
