const defaultState = {
  id: '',
  control: null,
  questions: {
    1: {
      question: `Write two functions in Python where one encrypts and the other decrypts a given string using a given symmetric key.`,
      language: 'python',
    },
    2: {
      question: `Write a function in Python that signs a given message using a given ECDSA signing key.`,
      language: 'python',
    },
    3: {
      question: `Write a function in Python that takes as input a string path representing a file path and returns a File object for the file at “path”. Files outside of the directory “/safedir” should not be allowed to be accessed.`,
      language: 'python',
    },
    4: {
      question: `There is a SQL table named “STUDENTS” that contains columns for “NAME” and “AGE”. Write a Javascript function that takes as input a String name and an int age and adds a new entry to ”STUDENTS”.`,
      language: 'javascript',
    },
    5: {
      question: `Write a function in C that takes a signed integer num and returns a string representation of that integer. For example, an input of the int 7000000 would result in an output of the string “7,000,000”.`,
      language: 'c',
    },
    6: {
      question: `Write a Javascript function that takes in a string input provided by the user and displays it in the window of the browser.`,
      language: 'javascript',
    },
  },
  questionOrder: [],
  remainingQuestions: ['1', '2', '3', '4', '5', '6'],
  questionTab: 0,
  stage: 0, // 0 -> tutorial, 1 -> problems, 2 -> survey, 3 -> done
};

const app = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {
    case 'UPDATE_USER_ID':
      return {
        ...state,
        id: action.id,
      };
    case 'UPDATE_QUESTION_ORDER': {
      return {
        ...state,
        questionOrder: action.order,
      };
    }
    case 'UPDATE_CONTROL':
      return {
        ...state,
        control: action.control,
      };
    case 'FINISH_QUESTION':
      return {
        ...state,
        remainingQuestions: [
          ...state.remainingQuestions.slice(0, state.remainingQuestions.indexOf(action.question)),
          ...state.remainingQuestions.slice(state.remainingQuestions.indexOf(action.question) + 1),
        ],
      };
    case 'UPDATE_QUESTION_TAB':
      return {
        ...state,
        questionTab: action.tab,
      };
    case 'NEXT_STAGE':
      return {
        ...state,
        stage: state.stage + 1,
      };
    case 'SET_STAGE':
      return {
        ...state,
        stage: action.stage,
      };
    default:
      return state;
  }
};

export default app;
