// src/redux/reducers/projectReducer.js
const initialState = {
    publicProjectId: null,
  };
  
  export default function projectReducer(state = initialState, action) {
    switch (action.type) {
      case 'UPDATE_PUBLIC_PROJECT_ID':
        return { ...state, publicProjectId: action.payload };
      default:
        return state;
    }
  }
  