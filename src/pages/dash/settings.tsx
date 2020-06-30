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
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold my-4 text-2xl'>Profile Photo</h1>
            <img
              className='w-24 h-24 object-top rounded-full'
              src={photoUrl}
            ></img>
            <button className='btn my-4' onClick={handleDeletePhoto}>
              Change Photo
            </button>
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
