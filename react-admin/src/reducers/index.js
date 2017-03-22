import { combineReducers } from 'redux';
import { getStateSettings, updateStateSetting } from './settings'
import { getJobsReducer, createJobReducer, updateJobReducer, deleteJobReducer } from './jobs'

const rootReducer = combineReducers({
  getStateSettings,
  updateStateSetting,
  getJobsReducer,
  createJobReducer,
  updateJobReducer,
  deleteJobReducer
});

export default rootReducer;
