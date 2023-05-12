  export const REGISTER_REQUEST = "REGISTER_REQUEST";
  export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
  export const REGISTER_FAILURE = "REGISTER_FAILURE";

  export const registerRequest = (
    firstName,
    lastName,
    userName,
    email,
    password,
    passwordConfirm
  ) => ({
    type: REGISTER_REQUEST,
    payload: { firstName, lastName, userName, email, password, passwordConfirm },
  });

  export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data,
  });

  export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
  });
