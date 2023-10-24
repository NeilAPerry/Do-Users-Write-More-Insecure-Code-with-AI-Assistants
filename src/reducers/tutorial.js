const defaultState = {
  code: {
    input: '',
    output: '',
    red: false,
  },
  codex: {
    text: '',
    res: '',
    temp: 0,
    spin: false,
    length: 100,
  },
};

const tutorial = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TUTORIAL_CODE_INPUT':
      return {
        ...state,
        code: {
          ...state.code,
          input: action.input,
        },
      };
    case 'UPDATE_TUTORIAL_CODE_OUTPUT':
      return {
        ...state,
        code: {
          ...state.code,
          output: action.output,
          red: action.error,
        },
      };
    case 'UPDATE_TUTORIAL_CODEX_INPUT_TEXT':
      return {
        ...state,
        codex: {
          ...state.codex,
          text: action.text,
        },
      };
    case 'UPDATE_TUTORIAL_CODEX_RESPONSE':
      return {
        ...state,
        codex: {
          ...state.codex,
          res: action.res,
        },
      };
    case 'UPDATE_TUTORIAL_CODEX_INPUT_TEMP':
      return {
        ...state,
        codex: {
          ...state.codex,
          temp: action.temp,
        },
      };
    case 'START_TUTORIAL_SPIN':
      return {
        ...state,
        codex: {
          ...state.codex,
          spin: true,
        },
      };
    case 'END_TUTORIAL_SPIN':
      return {
        ...state,
        codex: {
          ...state.codex,
          spin: false,
        },
      };
    case 'UPDATE_TUTORIAL_CODEX_RESPONSE_LENGTH':
      return {
        ...state,
        codex: {
          ...state.codex,
          length: action.length,
        },
      };
    default:
      return state;
  }
};

export default tutorial;
