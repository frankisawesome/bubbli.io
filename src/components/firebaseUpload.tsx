import React, {
  useRef,
  useContext,
  FormEvent,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { FirebaseContext } from '../firebase/Firebase';
import { UserContext } from '../hooks/useAuth';
import { Redirect } from 'react-router';

export const Upload = () => {
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
    }
  }
  return success ? (
    <Redirect to='/admin' />
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className='font-bold my-4 text-2xl'>Upload Your Profile Photo</h1>
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
