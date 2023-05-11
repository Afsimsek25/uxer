// redux/actions/agentActions.js

export const AGENT_REQUEST = 'AGENT_REQUEST';
export const AGENT_SUCCESS = 'AGENT_SUCCESS';
export const AGENT_FAILURE = 'AGENT_FAILURE';

export const agentRequest = (payload) => ({
  type: AGENT_REQUEST,
  payload,
});

export const agentSuccess = (payload) => ({
  type: AGENT_SUCCESS,
  payload,
});

export const agentFailure = (error) => ({
  type: AGENT_FAILURE,
  error,
});
