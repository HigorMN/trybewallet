export const LOGIN_USER = 'LOGIN_USER';

export const userAction = (email) => ({
  type: LOGIN_USER,
  email,
});
