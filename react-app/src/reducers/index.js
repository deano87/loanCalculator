import { combineReducers } from 'redux';
import { calcSettings, calcResults } from './calc'

const rootReducer = combineReducers({
  calcSettings,
  calcResults
});

export default rootReducer;
