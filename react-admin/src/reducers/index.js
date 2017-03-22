import { combineReducers } from 'redux';
import { getStateSettings, updateStateSetting } from './settings'

const rootReducer = combineReducers({
  getStateSettings,
  updateStateSetting
});

export default rootReducer;
