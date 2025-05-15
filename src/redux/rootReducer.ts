import { combineReducers } from '@reduxjs/toolkit';
import yarnReducer from './yarnSlice';
import patternsReducer from './patternSlice';
import projectsReducer from './projectSlice';

const rootReducer = combineReducers({
  yarn: yarnReducer,
  projects: projectsReducer,
  patterns: patternsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
