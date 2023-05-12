export const FETCH_JOBS = "FETCH_JOBS";
export const ADD_JOB = "ADD_JOB";
export const DELETE_JOB = "DELETE_JOB";
export const EDIT_JOB = "EDIT_JOB";
export const DUPLICATE_JOB = "DUPLICATE_JOB";

export const fetchJobs = () => ({
  type: FETCH_JOBS,
});

export const addJob = (job) => ({
  type: ADD_JOB,
  payload: job,
});

export const deleteJob = (jobId) => ({
  type: DELETE_JOB,
  payload: jobId,
});

export const editJob = (job) => ({
  type: EDIT_JOB,
  payload: job,
});

export const duplicateJob = (jobId) => ({
  type: DUPLICATE_JOB,
  payload: jobId,
});
