import { combineReducers } from 'redux';
import app from './app';
import tutorial from './tutorial';
import terminal from './terminal';
import code from './code';
import codex from './codex';
import survey from './survey';
import debrief from './debrief';
import consent from './consent';
import timing from './timing';

const rootReducer = combineReducers({
  app,
  tutorial,
  terminal,
  code,
  codex,
  survey,
  debrief,
  consent,
  timing,
});

export default rootReducer;
