import { combineReducers } from '@reduxjs/toolkit';
import yarnReducer from './yarnSlice';

const rootReducer = combineReducers({
  yarn: yarnReducer,
  // projects: projectsReducer,
  // patterns: patternsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
