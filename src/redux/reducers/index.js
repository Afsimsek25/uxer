import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import projectReducer from "./projectReducer";
import { agentReducer } from './agentReducer'; // Named import

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  project: projectReducer,
  agent: agentReducer, // agentReducer'ı burada kullanın
});

export default rootReducer;
