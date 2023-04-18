export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerRequest = (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  passwordConfirm: string
) => ({
  type: REGISTER_REQUEST,
  payload: { firstName, lastName, userName, email, password, passwordConfirm },
});

export const registerSuccess = (data: any) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
