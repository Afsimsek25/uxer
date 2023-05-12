// src/redux/reducers/index.js
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import { agentReducer } from './agentReducer';
import jobReducer from './JobReducer'; // Import JobReducer

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  project: projectReducer,
  agent: agentReducer,
  job: jobReducer, // Add JobReducer
});

export default rootReducer;
