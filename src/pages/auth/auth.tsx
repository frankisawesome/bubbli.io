import React, { useState, useContext, FC } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validator } from './validator';
import { FirebaseContext } from '../../firebase/Firebase';
import { Link } from 'react-router-dom';

type formType = 'login' | 'register';

export const LoginRegisterForm: FC<any> = (props) => {
  const loginRegisterStates = {
    email: '',
    password: '',
    name: '',
  };
  const firebase = useContext(FirebaseContext);
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
      props.history.push('/');
    } catch (e) {
      console.error(e.message);
      setSubmissionError(e.message);
    }
  }
  return (
    <div>
      <h2 className='mv3'>{form === 'login' ? 'Login' : 'Create Account'}</h2>

      <form className='flex flex-col'>
        {form === 'register' && (
          <input
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Your name'
            value={values.name}
          ></input>
        )}

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name='email'
          type='email'
          placeholder='Your email'
          value={values.email}
        ></input>
        {errorMap && errorMap.email && <p>{errorMap.email}</p>}

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name='password'
          type='password'
          placeholder='Choose password'
          value={values.password}
        ></input>
        {errorMap && errorMap.password && (
          <p className='error-text'>{errorMap.password}</p>
        )}
        {submissionError && <p>{submissionError}</p>}

        <div className='flex'>
          <button
            onMouseDown={handleSubmit}
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            submit
          </button>

          <button
            type='button'
            onClick={() =>
              setForm((old) => (old === 'login' ? 'register' : 'login'))
            }
          >
            {form === 'login'
              ? 'need to create account? '
              : 'already have an account?'}
          </button>
        </div>
      </form>
      <div>
        <Link to='/forgot'>forgot password?</Link>
      </div>
    </div>
  );
};
