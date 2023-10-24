const defaultState = {
  sharing: '',
  permission: '',
};

const debrief = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DEBRIEF_SHARING':
      return {
        ...state,
        sharing: action.sharing,
      };
    case 'UPDATE_DEBRIEF_PERMISSION':
      return {
        ...state,
        permission: action.permission,
      };
    default:
      return state;
  }
};

export default debrief;
