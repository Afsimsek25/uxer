export const FETCH_JOBS = "FETCH_JOBS";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILED = "FETCH_JOBS_FAILED";

export const ADD_JOB = "ADD_JOB";
export const ADD_JOB_SUCCESS = "ADD_JOB_SUCCESS";
export const ADD_JOB_FAILED = "ADD_JOB_FAILED";

export const DELETE_JOB = "DELETE_JOB";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_FAILED = "DELETE_JOB_FAILED";

export const EDIT_JOB = "EDIT_JOB";
export const EDIT_JOB_SUCCESS = "EDIT_JOB_SUCCESS";
export const EDIT_JOB_FAILED = "EDIT_JOB_FAILED";

export const DUPLICATE_JOB = "DUPLICATE_JOB";
export const DUPLICATE_JOB_SUCCESS = "DUPLICATE_JOB_SUCCESS";
export const DUPLICATE_JOB_FAILED = "DUPLICATE_JOB_FAILED";

// actions for fetchJobs
export const fetchJobs = (id) => ({
  type: FETCH_JOBS,
  payload: id,
});
export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});
export const fetchJobsFailed = (error) => ({
  type: FETCH_JOBS_FAILED,
  payload: error,
});

// actions for addJob
export const addJob = (job) => ({
  type: ADD_JOB,
  payload: job,
});
export const addJobSuccess = (job) => ({
  type: ADD_JOB_SUCCESS,
  payload: job,
});
export const addJobFailed = (error) => ({
  type: ADD_JOB_FAILED,
  payload: error,
});

// actions for deleteJob
export const deleteJob = (jobId) => ({
  type: DELETE_JOB,
  payload: jobId,
});
export const deleteJobSuccess = (jobId) => ({
  type: DELETE_JOB_SUCCESS,
  payload: jobId,
});
export const deleteJobFailed = (error) => ({
  type: DELETE_JOB_FAILED,
  payload: error,
});

// actions for editJob
export const editJob = (job) => ({
  type: EDIT_JOB,
  payload: job,
});
export const editJobSuccess = (job) => ({
  type: EDIT_JOB_SUCCESS,
  payload: job,
});
export const editJobFailed = (error) => ({
  type: EDIT_JOB_FAILED,
  payload: error,
});

// actions for duplicateJob
export const duplicateJob = (jobId) => ({
  type: DUPLICATE_JOB,
  payload: jobId,
});
export const duplicateJobSuccess = (jobId) => ({
  type: DUPLICATE_JOB_SUCCESS,
  payload: jobId,
});
export const duplicateJobFailed = (error) => ({
  type: DUPLICATE_JOB_FAILED,
  payload: error,
});
