import { useState, useEffect } from 'react';

export interface NameToStringMap {
  //the key should be a name for an input, and the string can be the value or relevant error message
  [key: string]: string;
}

//loops through all states and check for errors, if any, return a new NameToStringMap that specifies error for each property
type validator = (states: NameToStringMap) => NameToStringMap | null;

type callback = () => void;

//Takes in some initial states, a validate function and a onsubmit function.
export const useFormValidation = (
  initialState: NameToStringMap,
  validator: validator,
  onSubmit: callback
) => {
  const [values, setValues] = useState(initialState);
  const [errorMap, setErrorMap] = useState<NameToStringMap | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      submitIfNoError();
    }
  }, [errorMap, isSubmitting]);

  async function submitIfNoError() {
    if (!errorMap) {
      await onSubmit();
      setSubmitting(false);
    } else {
      setSubmitting(false);
    }
  }

  //map the input values into states, based on input's name
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.persist();
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  //validate the inputs on every blur
  function handleBlur() {
    const errors = validator(values);
    setErrorMap(errors);
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const errors = validator(values);
    setErrorMap(errors);
    if (!errors) {
      setSubmitting(true);
    }
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errorMap,
    isSubmitting,
  };
};
