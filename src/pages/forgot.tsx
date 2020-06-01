import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../firebase/Firebase';
import { RouteComponentProps } from 'react-router';

export const Forgot = (props: RouteComponentProps) => {
  const [email, setEmail] = useState<string>('');
  const firebase = useContext(FirebaseContext);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isReset) {
      setTimeout(() => props.history.push('/login'), 3000);
    }
  }, [isReset]);

  const handleReset = async () => {
    try {
      setIsReset(false);
      await firebase.resetPassword(email);
      setIsReset(true);
    } catch (e) {
      setIsReset(false);
      setError(e.message);
    }
  };
  return (
    <div className='flex flex-col mt-12 w-full max-w-md items-center bubble'>
      <h1 className='text-2xl font-semibold'>reset your password</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        placeholder='Your email address'
        className='form-input max-w-md mt-4'
      />
      <button className='btn max-w-md mt-4' onClick={handleReset}>
        Reset
      </button>
      {isReset && (
        <p className='font-bold'>
          Password reset email sent, check your inbox!
        </p>
      )}
      {error && <p className='font-bold'>{error}</p>}
    </div>
  );
};
