import React, { useRef, useContext, FormEvent, useState, FC } from 'react';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';
import { Redirect } from 'react-router';

export const Upload: FC<{ filename: string }> = ({ filename }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const file = (fileInput as any).current.files[0];
    if (file) {
      const fileRef = firebase.storage.refFromURL(
        `gs://airbiodotme.appspot.com/users/${user?.uid}/profile.jpg`
      );
      fileRef.put(file).then(() => console.log('uploaded'));
      console.log(
        `gs://airbiodotme.appspot.com/users/${user?.uid}/profile.jpg`
      );
      user
        ?.updateProfile({
          photoURL: `gs://airbiodotme.appspot.com/users/${user?.uid}/profile.jpg`,
        })
        .then(() => setSuccess(true));
    } else {
      window.alert('No file selected!');
    }
  }
  return success ? (
    <Redirect to='/admin' />
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/png, image/jpeg'
          name='avatart'
          ref={fileInput}
        />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
};
