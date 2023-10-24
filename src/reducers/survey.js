import countryList from "../country_list";
import languageList from "../language_list";

const defaultState = {
  problemQuestions: {
    questions: [
      'I think I solved this task correctly.',
      'I think I solved this task securely.',
      'I feel comfortable in this programming language.',
      'I trusted the AI to produce secure code.',
    ],
    choices: [
      'Strongly Agree',
      'Agree',
      'Neutral',
      'Disagree',
      'Strongly Disagree',
      'I Don’t Know.',
    ],
    // can look up the question and display it so user remembers
    // each array is the list of answers for that question
    answers: {
      1: ['', '', '', ''],
      2: ['', '', '', ''],
      3: ['', '', '', ''],
      4: ['', '', '', ''],
      5: ['', '', '', ''],
      6: ['', '', '', ''],
    },
  },
  demographicQuestions: [
    {
      type: 'multiple choice',
      question: 'Are you currently a student?',
      choices: [
        'Undergraduate',
        'Graduate',
        'Professional Certification Program',
        'Other [specify]',
        'Not a student',
      ],
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'What is the highest level of education that you have completed?',
      choices: [
        'Less than High School',
        'High School',
        'Some College',
        'College',
        'Some Graduate School',
        'Graduate School',
      ],
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'If not currently a student, are you currently employed at a job where programming is a critical part of your job responsibility?',
      choices: [
        'yes',
        'no',
        'NA',
      ],
      answer: '',
    },
    {
      type: 'check all',
      question: 'Check all that apply: Have you ever taken a programming class?',
      choices: [
        'at an undergraduate level',
        'at a graduate level',
        'via online learning',
        'via professional training',
        'another way [specify]',
        'no, but I took a class that had programming as one major component or module',
        'No',
      ],
      answer: [],
    },
    {
      type: 'input',
      question: 'How many total classes with a programming component have you taken? [input a number]',
      answer: '',
    },
    {
      type: 'input',
      question: 'When did you last take a programming class? [input a year]',
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'Do you have experience programming outside of school?',
      choices: [
        'Professionally (you got paid to do it)',
        'As a hobby',
        'No',
        'Other [specify]',
      ],
      answer: '',
    },
    {
      type: 'input',
      question: 'For how many years have you been programming? [number]',
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'How did you primarily learn to program? (Choose one)',
      choices: [
        'Self-taught',
        'In a university / as part of a degree',
        'In an online learning program',
        'In a professional certification program',
        'On the job',
        'Other [specify]',
      ],
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'How often do you pair program (working with another person on the same program at the same time)?',
      choices: [
        'Never',
        'Occasionally',
        'Frequently',
      ],
      answer: '',
    },
    {
      type: 'check all',
      question: 'Check all that apply: Have you ever taken a computer security class?',
      choices: [
        'at an undergraduate level',
        'at a graduate level',
        'via online learning',
        'via professional training',
        'another way [specify]',
        'no, but I took a class that had security as one major component or module',
        'No',
      ],
      answer: [],
    },
    {
      type: 'input',
      question: 'How many computer security classes total have you taken? [input a number]',
      answer: '',
    },
    {
      type: 'input',
      question: 'When did you last take a computer security class? [input a year]',
      answer: '',
    },
    {
      type: 'check all',
      question: 'Check all that apply: Do you have experience working in computer security or privacy outside of school?',
      choices: [
        'Professionally (you got paid to do it)',
        'As a hobby',
        'No',
        'Other [specify]',
      ],
      answer: [],
    },
    {
      type: 'input',
      question: 'What is your age? [number]',
      answer: '',
    },
    {
      type: 'multiple choice',
      question: 'What is your gender?',
      choices: [
        'Male',
        'Female',
        'Other',
        'Prefer not to answer',
      ],
      answer: '',
    },
    {
      //! Add dropdown as type
      type: 'drop down',
      question: 'What country did you (primarily) grow up in? [list of countries]',
      choices: countryList,
      answer: '',
    },
    {
      type: 'drop down',
      question: 'What is your native language (mother tongue)? [list of languages]',
      choices: languageList,
      answer: '',
    },
  ],
};

const survey = (state = defaultState, action) => {
  switch (action.type) {
    // todo: action will contain questionID, answer, and index
    case 'UPDATE_SURVEY_PROBLEM':
      return {
        ...state,
        problemQuestions: {
          ...state.problemQuestions,
          answers: {
            ...state.problemQuestions.answers,
            [action.questionID]: [
              ...state.problemQuestions.answers[action.questionID].slice(0, action.index),
              action.answer,
              ...state.problemQuestions.answers[action.questionID].slice(action.index + 1),
            ],
          },
        },
      };
    // todo: action will contain index of question and answer
    case 'UPDATE_SURVEY_DEMOGRAPHIC':
      return {
        ...state,
        demographicQuestions: [
          ...state.demographicQuestions.slice(0, action.index),
          {
            ...state.demographicQuestions[action.index],
            answer: action.answer,
          },
          ...state.demographicQuestions.slice(action.index + 1),
        ],
      };
    default:
      return state;
  }
};

export default survey;
