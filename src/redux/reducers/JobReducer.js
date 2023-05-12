import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILED,
  ADD_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILED,
  EDIT_JOB,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_FAILED,
  DUPLICATE_JOB,
  DUPLICATE_JOB_SUCCESS,
  DUPLICATE_JOB_FAILED
} from "../actions/jobActions";

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        loading: true
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };
    case FETCH_JOBS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_JOB:
      return {
        ...state,
        loading: true
      };
    case ADD_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: [...state.jobs, action.payload],
      };
    case ADD_JOB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_JOB:
      return {
        ...state,
        loading: true
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };
    case DELETE_JOB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case EDIT_JOB:
      return {
        ...state,
        loading: true
      };
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case EDIT_JOB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DUPLICATE_JOB:
      return {
        ...state,
        loading: true
      };
    case DUPLICATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: [...state.jobs, { ...action.payload, id: new Date().getTime() }], // For simplicity, new id is timestamp
      };
    case DUPLICATE_JOB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default JobReducer;
