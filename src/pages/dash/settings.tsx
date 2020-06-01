import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../firebase/Firebase';
import { UserContext } from '../../hooks/useAuth';
import { Upload } from '../../components/firebaseUpload';
import { Redirect } from 'react-router';
export const Settings = () => {
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

  if (user) {
    return (
      <div>
        {user.photoURL ? (
          <div>
            Your profile photo is: <img src={photoUrl}></img>
            <button onClick={handleDeletePhoto}>Delete Photo</button>
          </div>
        ) : (
          <Upload setPhotoUrl={setPhotoUrl} />
        )}
      </div>
    );
  } else {
    return <Redirect to='/login'></Redirect>;
  }
};
