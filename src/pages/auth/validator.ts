import { NameToStringMap } from '../../hooks/useFormValidation';

export const validator = (fields: NameToStringMap): NameToStringMap | null => {
  let errors: NameToStringMap = {};
  if (!fields.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.email)) {
    errors.email = 'Invalid email address';
  }

  if (!fields.password) {
    errors.password = 'Password required';
  } else if (fields.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (fields.name.length > 20) {
    errors.name = 'Nick name must be under 20 characters';
  } else if (
    fields.name === ('about' || 'admin' || 'settings' || 'login' || '')
  ) {
    errors.name = 'Forbidden user name';
  }

  if (Object.keys(errors).length === 0) {
    return null;
  } else {
    return errors;
  }
};
