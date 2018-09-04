const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const emailValidator = email => {
  if (!emailRegex.test(email)) {
    return `Please provide a valid email.`;
  }
  return;
};

const oneUppercaseRegex = /[A-Z]/;
const oneNumberRegex = /[0-9]/;
export const passwordValidator = password => {
  if (
    password.length < 8 ||
    password.search(oneUppercaseRegex) < 0 ||
    password.search(oneNumberRegex) < 0
  ) {
    return 'Passwords must be at least 8 characters long and contain at least one number and one uppercase letter.';
  }
  return;
};
