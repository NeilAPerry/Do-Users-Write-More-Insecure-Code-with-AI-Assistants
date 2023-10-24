const defaultState = {
  loaded: false,
  spin: false,
  apiKey: '',
  inputs: [
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
    {
      text: '',
      res: '',
      temp: 0,
      len: 100,
    },
  ],
};

const codex = (state = defaultState, action) => {
  switch (action.type) {
    case 'CODEX_LOAD':
      return {
        ...state,
        loaded: true,
      };
    case 'UPDATE_CODEX_KEY':
      return {
        ...state,
        apiKey: action.apiKey,
      };
    case 'START_SPIN':
      return {
        ...state,
        spin: true,
      };
    case 'END_SPIN':
      return {
        ...state,
        spin: false,
      };
    case 'UPDATE_CODEX_INPUT_TEXT':
      return {
        ...state,
        inputs: [
          ...state.inputs.slice(0, action.index),
          {
            ...state.inputs[action.index],
            text: action.text,
          },
          ...state.inputs.slice(action.index + 1),
        ],
      };
    case 'UPDATE_CODEX_RESPONSE':
      return {
        ...state,
        inputs: [
          ...state.inputs.slice(0, action.index),
          {
            ...state.inputs[action.index],
            res: action.res,
          },
          ...state.inputs.slice(action.index + 1),
        ],
      };
    case 'UPDATE_CODEX_INPUT_TEMP':
      return {
        ...state,
        inputs: [
          ...state.inputs.slice(0, action.index),
          {
            ...state.inputs[action.index],
            temp: action.temp,
          },
          ...state.inputs.slice(action.index + 1),
        ],
      };
    case 'UPDATE_CODEX_RESPONSE_LENGTH':
      return {
        ...state,
        inputs: [
          ...state.inputs.slice(0, action.index),
          {
            ...state.inputs[action.index],
            len: action.len,
          },
          ...state.inputs.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};

export default codex;
