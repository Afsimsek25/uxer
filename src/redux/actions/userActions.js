
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

// updateUser işlemi için action tipleri
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

// getUser işlemi için action oluşturma fonksiyonları
export const getUserRequest = () => {
    return {
      type: GET_USER_REQUEST
    };
  };
  
  export const getUserSuccess = (user) => {
    return {
      type: GET_USER_SUCCESS,
      payload: user
    };
  };
  
  export const getUserFailure = (error) => {
    return {
      type: GET_USER_FAILURE,
      error: error
    };
  };
  
  // updateUser işlemi için action oluşturma fonksiyonları
  export const updateUserRequest = () => {
    return {
      type: UPDATE_USER_REQUEST
    };
  };
  
  export const updateUserSuccess = (updatedUser) => {
    return {
      type: UPDATE_USER_SUCCESS,
      payload: updatedUser
    };
  };
  
  export const updateUserFailure = (error) => {
    return {
      type: UPDATE_USER_FAILURE,
      error: error
    };
  };
  