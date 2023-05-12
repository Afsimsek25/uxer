// redux/reducers/agentReducer.js

import { AGENT_REQUEST, AGENT_SUCCESS, AGENT_FAILURE } from '../actions/agentActions';

const initialState = {
  agents: [],
  loading: false,
  error: null
};

export const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGENT_REQUEST:
      return { ...state, loading: true };
    case AGENT_SUCCESS:
      return { ...state, loading: false, agents: action.payload };
    case AGENT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
