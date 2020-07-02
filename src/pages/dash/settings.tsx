import React, { useContext } from 'react';
import { Upload } from '../../components/firebaseUpload';
import { Redirect } from 'react-router';
import { usePhoto } from '../../hooks/usePhoto';
import { UserContext } from '../../hooks/useAuth';
export const Settings = () => {
  const [photoUrl, handleDeletePhoto] = usePhoto();
  const user = useContext(UserContext);
  if (user) {
    return (
      <div>
        {photoUrl ? (
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
          <>
            <h1 className='font-bold my-4 text-2xl'>
              Upload Your Profile Photo
            </h1>
            <Upload filename='profile' />
          </>
        )}
      </div>
    );
  } else {
    return <Redirect to='/login'></Redirect>;
  }
};
