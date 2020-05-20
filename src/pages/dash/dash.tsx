import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Firebase from 'firebase';
import { UserContext } from '../../hooks/useAuth';
import { Bubbles } from './bubbles';
import { Upload } from '../../components/firebaseUpload';
import { FirebaseContext } from '../../firebase/Firebase';

export const UserDashboard = () => {
  const user: Firebase.User | null = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

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
        <h1>Welcom to your dashboard, {user.displayName}</h1>
        <p>Your email is: {user.email}</p>
        {user.photoURL ? (
          <div>
            Your profile photo is: <img src={photoUrl}></img>
            <button onClick={handleDeletePhoto}>Delete Photo</button>
          </div>
        ) : (
          <Upload setPhotoUrl={setPhotoUrl} />
        )}
        <Bubbles user={user} />
      </div>
    );
  } else {
    return <Redirect to='/login' />;
  }
};
