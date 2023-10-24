const defaultState = [
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
  {
    input: '',
    output: '',
    error: false,
    time: 0,
  },
];

const code = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_CODE_INPUT':
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          input: action.input,
        },
        ...state.slice(action.index + 1),
      ];
    case 'UPDATE_CODE_OUTPUT':
      return [
        ...state.slice(0, action.index),
        {
          ...state[action.index],
          output: action.output,
          error: action.error,
        },
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default code;
