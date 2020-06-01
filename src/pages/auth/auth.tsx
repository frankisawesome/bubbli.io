import React, { useState, useContext, FC } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validator } from './validator';
import { FirebaseContext } from '../../firebase/Firebase';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../hooks/useAuth';

type formType = 'login' | 'register';

export const LoginRegisterForm: FC<any> = (props) => {
  const loginRegisterStates = {
    email: '',
    password: '',
    name: '',
  };
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [form, setForm] = useState<formType>('login');
  const {
    values,
    errorMap,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormValidation(loginRegisterStates, validator, authenticateUser);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      form === 'login'
        ? await firebase.login({ email, password })
        : await firebase.register({ email, name, password });
    } catch (e) {
      if (e.message === 'Request failed with status code 409') {
        setSubmissionError('User already exists!');
      }
    }
  }
  if (!user) {
    return (
      <div className='block mt-12 w-3/4 lg:w-1/2'>
        <div className='flex flex-col items-center space-y-4 bubble'>
          <h2 className='text-3xl font-semibold'>
            {form === 'login' ? 'login' : 'create account'}
          </h2>
          {form === 'register' && (
            <>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name='name'
                type='text'
                className={
                  errorMap && errorMap.name ? 'form-input-error' : 'form-input'
                }
                placeholder='Your name'
                value={values.name}
              ></input>
              {errorMap && errorMap.name && (
                <p className='font-bold'>{errorMap?.name}</p>
              )}
            </>
          )}

          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'
            type='email'
            placeholder='Your email'
            className={
              errorMap && errorMap.email ? 'form-input-error' : 'form-input'
            }
            value={values.email}
          ></input>
          {errorMap && errorMap.email && (
            <p className='font-bold'>{errorMap.email}</p>
          )}

          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
            type='password'
            placeholder='Choose password'
            className={
              errorMap && errorMap.password ? 'form-input-error' : 'form-input'
            }
            value={values.password}
          ></input>
          {errorMap && errorMap.password && (
            <p className='font-bold'>{errorMap.password}</p>
          )}
          {submissionError && <p className='font-bold'>{submissionError}</p>}

          <div className='flex flex-col space-y-2'>
            <button
              onMouseDown={handleSubmit}
              disabled={isSubmitting}
              className={isSubmitting ? 'btn btn-submitting' : 'btn'}
            >
              submit
            </button>

            <button
              type='button'
              onClick={() =>
                setForm((old) => (old === 'login' ? 'register' : 'login'))
              }
              className='btn-alt'
            >
              {form === 'login'
                ? 'need to create account? '
                : 'already have an account?'}
            </button>
            <Link className='btn-alt text-center' to='/forgot'>
              forgot password?
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/admin' />;
  }
};
