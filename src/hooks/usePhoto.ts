import { useState, useContext, useEffect, SetStateAction } from 'react';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';

export const usePhoto: () => [string | undefined, () => void] = () => {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  function handleDeletePhoto() {
    firebase.storage
      .ref(`users/${user?.uid}/profile.jpg`)
      .delete()
      .then(() => console.log('deleted'));
    user?.updateProfile({ photoURL: null }).then(() => setPhotoUrl(undefined));
  }

  useEffect(() => {
    if (user?.photoURL) {
      firebase.storage
        .ref(`users/${user.uid}/profile.jpg`)
        .getDownloadURL()
        .then((url) => setPhotoUrl(url));
    }
  }, [user, photoUrl]);

  return [photoUrl, handleDeletePhoto];
};
