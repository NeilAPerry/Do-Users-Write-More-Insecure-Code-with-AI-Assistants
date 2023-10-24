const defaultState = {
  screen: '',
  key: '',
  audio: '',
  tapes: '',
};

const debrief = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SCREEN_RECORDING':
      return {
        ...state,
        screen: action.screen,
      };
    case 'UPDATE_KEY_RECORDING':
      return {
        ...state,
        key: action.key,
      };
    case 'UPDATE_AUDIO_RECORDING':
      return {
        ...state,
        audio: action.audio,
      };
    case 'UPDATE_TAPES':
      return {
        ...state,
        tapes: action.tapes,
      };
    default:
      return state;
  }
};

export default debrief;
