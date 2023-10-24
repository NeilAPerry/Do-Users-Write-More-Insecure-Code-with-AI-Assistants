const defaultState = {
  input: '',
  output: '',
};

const terminal = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_TERMINAL_INPUT':
      return {
        ...state,
        input: action.input,
      };
    case 'UPDATE_TERMINAL_OUTPUT':
      return {
        ...state,
        output: action.output,
      };
    default:
      return state;
  }
};

export default terminal;
