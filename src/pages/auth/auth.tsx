import React, { useState, useContext, FC } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validator } from './validator';
import { FirebaseContext } from '../../firebase/Firebase';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../hooks/useAuth';
import { ErrorMessage } from '../../components/errorMessage';

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
      //axios will throw this if there's a duplicate username
      if (e.message === 'Request failed with status code 409') {
        setSubmissionError('User already exists!');
      } else {
        setSubmissionError(e.message);
      }
    }
  }
  if (!user) {
    return (
      <form className='block mt-12 w-3/4 lg:w-1/2' onSubmit={handleSubmit}>
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
                placeholder='bio name unique to you'
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
            placeholder='your email'
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
            placeholder='your password'
            className={
              errorMap && errorMap.password ? 'form-input-error' : 'form-input'
            }
            value={values.password}
          ></input>
          {errorMap && errorMap.password && (
            <p className='font-bold'>{errorMap.password}</p>
          )}
          {submissionError && (
            <ErrorMessage
              errorTitle={`${form} failed!`}
              errorMessage={submissionError}
              closeCallback={() => setSubmissionError(null)}
            />
          )}

          <div className='flex flex-col space-y-2'>
            <button
              type='submit'
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
            {form === 'register' && isSubmitting && (
              <h1 className='px-4'>Validating user name, just a moment...</h1>
            )}
          </div>
        </div>
      </form>
    );
  } else {
    return <Redirect to='/admin' />;
  }
};
