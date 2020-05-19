import { Firebase } from '../firebase/Firebase';
import fb from 'firebase';
import { useEffect, useState, createContext } from 'react';

export const useAuth = (firebase: Firebase): firebase.User | null => {
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authUser;
};

export const UserContext = createContext<fb.User | null>(null);
