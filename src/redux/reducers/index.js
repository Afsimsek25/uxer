// src/redux/reducers/index.js
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import { agentReducer } from './agentReducer';
import jobReducer from './JobReducer';
import testReducer from './testReducer';
import folderReducer from './folderReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  project: projectReducer,
  agent: agentReducer,
  job: jobReducer,
  test: testReducer,
  folder: folderReducer,
});

export default rootReducer;
