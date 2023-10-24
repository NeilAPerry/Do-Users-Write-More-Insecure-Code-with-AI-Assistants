const defaultState = {
  times: [0, 0, 0, 0, 0, 0],
  currTime: 0, // set at end of tutorial to Date.now()
};

const timing = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_CURR_TIME':
      return {
        ...state,
        currTime: action.time,
      };
    case 'UPDATE_QUESTION_TIME':
      return {
        ...state,
        times: [
          ...state.times.slice(0, action.index),
          state.times[action.index] + action.time,
          ...state.times.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};

export default timing;
