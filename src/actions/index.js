// app
const updateUserIDAction = (id) => ({
  type: 'UPDATE_USER_ID',
  id,
});

const updateQuestionOrderAction = (order) => ({
  type: 'UPDATE_QUESTION_ORDER',
  order,
});

const updateControlAction = (control) => ({
  type: 'UPDATE_CONTROL',
  control,
});

const finishQuestionAction = (question) => ({
  type: 'FINISH_QUESTION',
  question,
});

const updateQuestionTabAction = (tab) => ({
  type: 'UPDATE_QUESTION_TAB',
  tab,
});

const nextStageAction = () => ({
  type: 'NEXT_STAGE',
});

// useful for debugging
const setStageAction = (stage) => ({
  type: 'SET_STAGE',
});

// Consent
const updateScreenRecordingAction = (screen) => ({
  type: 'UPDATE_SCREEN_RECORDING',
  screen,
});

const updateKeyRecordingAction = (key) => ({
  type: 'UPDATE_KEY_RECORDING',
  key,
});

const updateAudioRecordingAction = (audio) => ({
  type: 'UPDATE_AUDIO_RECORDING',
  audio,
});

const updateTapesAction = (tapes) => ({
  type: 'UPDATE_TAPES',
  tapes,
});

// Survey
const updateSurveyProblemAction = (questionID, answer, index) => ({
  type: 'UPDATE_SURVEY_PROBLEM',
  questionID,
  answer,
  index,
});

const updateSurveyDemographicAction = (answer, index) => ({
  type: 'UPDATE_SURVEY_DEMOGRAPHIC',
  index,
  answer,
});

// Debrief
const updateDebriefSharingAction = (sharing) => ({
  type: 'UPDATE_DEBRIEF_SHARING',
  sharing,
});

const updateDebriefPermissionAction = (permission) => ({
  type: 'UPDATE_DEBRIEF_PERMISSION',
  permission,
});

// Tutorial
const updateTutorialCodeInputAction = (input) => ({
  type: 'UPDATE_TUTORIAL_CODE_INPUT',
  input,
});

const updateTutorialCodeOutputAction = (output, error) => ({
  type: 'UPDATE_TUTORIAL_CODE_OUTPUT',
  output,
  error,
});

const updateTutorialCodexInputTextAction = (text) => ({
  type: 'UPDATE_TUTORIAL_CODEX_INPUT_TEXT',
  text,
});

const updateTutorialCodexResponseAction = (res) => ({
  type: 'UPDATE_TUTORIAL_CODEX_RESPONSE',
  res,
});

const updateTutorialCodexInputTempAction = (temp) => ({
  type: 'UPDATE_TUTORIAL_CODEX_INPUT_TEMP',
  temp,
});

const startTutorialSpinCodex = () => ({
  type: 'START_TUTORIAL_SPIN',
});

const endTutorialSpinCodex = () => ({
  type: 'END_TUTORIAL_SPIN',
});

const updateTutorialCodexResponseLengthAction = (length) => ({
  type: 'UPDATE_TUTORIAL_CODEX_RESPONSE_LENGTH',
  length,
});

// Terminal
const updateTerminalInputAction = (input) => ({
  type: 'UPDATE_TERMINAL_INPUT',
  input,
});

const updateTerminalOutputAction = (output) => ({
  type: 'UPDATE_TERMINAL_OUTPUT',
  output,
});

// Code
const updateCodeInputAction = (input, index) => ({
  type: 'UPDATE_CODE_INPUT',
  input,
  index,
});

const updateCodeOutputAction = (output, error, index) => ({
  type: 'UPDATE_CODE_OUTPUT',
  output,
  error,
  index,
});

// Codex
const updateCodexInputTextAction = (text, index) => ({
  type: 'UPDATE_CODEX_INPUT_TEXT',
  text,
  index,
});

const updateCodexInputTempAction = (temp, index) => ({
  type: 'UPDATE_CODEX_INPUT_TEMP',
  temp,
  index,
});

const updateCodexResponseLengthAction = (len, index) => ({
  type: 'UPDATE_CODEX_RESPONSE_LENGTH',
  len,
  index,
});

const updateCodexResponseAction = (res, index) => ({
  type: 'UPDATE_CODEX_RESPONSE',
  res,
  index,
});

const updateCodexKeyAction = (apiKey) => ({
  type: 'UPDATE_CODEX_KEY',
  apiKey,
});

const loadCodex = () => ({
  type: 'CODEX_LOAD',
});

const startSpinCodex = () => ({
  type: 'START_SPIN',
});

const endSpinCodex = () => ({
  type: 'END_SPIN',
});

// Timing
const updateCurrTimeAction = (time) => ({
  type: 'UPDATE_CURR_TIME',
  time,
});

const updateQuestionTimeAction = (time, index) => ({
  type: 'UPDATE_QUESTION_TIME',
  time,
  index,
});

export default {
  updateUserIDAction,
  updateQuestionOrderAction,
  updateControlAction,
  finishQuestionAction,
  updateQuestionTabAction,
  nextStageAction,
  setStageAction,
  updateScreenRecordingAction,
  updateKeyRecordingAction,
  updateAudioRecordingAction,
  updateTapesAction,
  updateSurveyProblemAction,
  updateSurveyDemographicAction,
  updateDebriefSharingAction,
  updateDebriefPermissionAction,
  updateTutorialCodeInputAction,
  updateTutorialCodeOutputAction,
  updateTutorialCodexInputTextAction,
  updateTutorialCodexResponseAction,
  updateTutorialCodexInputTempAction,
  updateTutorialCodexResponseLengthAction,
  startTutorialSpinCodex,
  endTutorialSpinCodex,
  updateTerminalInputAction,
  updateTerminalOutputAction,
  updateCodeInputAction,
  updateCodeOutputAction,
  updateCodexInputTextAction,
  updateCodexInputTempAction,
  updateCodexResponseLengthAction,
  updateCodexResponseAction,
  updateCodexKeyAction,
  loadCodex,
  startSpinCodex,
  endSpinCodex,
  updateCurrTimeAction,
  updateQuestionTimeAction,
};
