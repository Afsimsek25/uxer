import {
    FETCH_JOBS,
    ADD_JOB,
    DELETE_JOB,
    EDIT_JOB,
    DUPLICATE_JOB,
  } from "../actions/jobActions";
  
  const initialState = {
    jobs: [],
  };
  
  const JobReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_JOBS:
        return {
          ...state,
          jobs: action.payload,
        };
      case ADD_JOB:
        return {
          ...state,
          jobs: [...state.jobs, action.payload],
        };
      case DELETE_JOB:
        return {
          ...state,
          jobs: state.jobs.filter((job) => job.id !== action.payload),
        };
      case EDIT_JOB:
        return {
          ...state,
          jobs: state.jobs.map((job) =>
            job.id === action.payload.id ? action.payload : job
          ),
        };
      case DUPLICATE_JOB:
        return {
          ...state,
          jobs: [...state.jobs, { ...action.payload, id: new Date().getTime() }], // For simplicity, new id is timestamp
        };
      default:
        return state;
    }
  };
  
  export default JobReducer;
  