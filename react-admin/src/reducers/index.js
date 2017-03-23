import { combineReducers } from 'redux';
import { getStateSettings, updateStateSetting } from './settings'
import { getScriptsReducer, runScriptReducer } from './scripts'
import { getJobsReducer, createJobReducer, updateJobReducer, deleteJobReducer } from './jobs'

const rootReducer = combineReducers({
  getStateSettings,
  updateStateSetting,
  getJobsReducer,
  createJobReducer,
  updateJobReducer,
  deleteJobReducer,
  getScriptsReducer,
  runScriptReducer
});

export default rootReducer;
