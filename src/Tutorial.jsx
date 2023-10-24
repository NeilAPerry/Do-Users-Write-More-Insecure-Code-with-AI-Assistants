import { React, useState } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import Modal from 'react-modal';
import Question from './Question';
import Terminal from './Terminal';
import CodeTutorial from './CodeTutorial';
import NextButton from './NextButton';
import actions from './actions/index';
import CodexTutorial from './CodexTutorial';
import ConfirmationTutorial from './ConfirmationTutorial';
import Instruction from './Instruction';

const {
  updateUserIDAction,
  updateCurrTimeAction,
} = actions;

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const outputStyle = {
  whiteSpace: 'pre-wrap',
  border: '5px solid rgba(222, 244, 64, 1)',
};

const outputStyleRed = {
  whiteSpace: 'pre-wrap',
  border: '5px solid rgba(255, 0, 0, 1)',
};

const codeExperimentStyle = {
  width: '50%',
  margin: '5px',
  marginTop: '43px',
};

const codeControlStyle = {
  width: '100%',
  margin: '5px',
  marginTop: '43px',
};

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -100%)',
  },
};

const getNextStep = (step, control) => {
  if (control && step === 3) {
    return 7;
  }
  return step + 1;
};

const getPrevStep = (step, control) => {
  if (control && step === 7) {
    return 3;
  }
  return step - 1;
};

const QuestionStep = (highlight) => (
  <div style={{ width: 'max-content' }}>
    <h3 style={highlight ? outputStyle : {}}>
      Print &quot;Hello World&quot; to the console.
    </h3>
  </div>
);

const EditorStep = (highlight, control) => (
  <div style={control ? codeControlStyle : codeExperimentStyle}>
    <div style={highlight ? outputStyle : {}}>
      <Tabs>
        <TabList>
          <Tab>
            Editor
          </Tab>
        </TabList>

        <TabPanel>
          <CodeTutorial control={control} num={0} question={`Print "Hello World" to the console.`} language="python" />
        </TabPanel>
      </Tabs>
    </div>
  </div>
);

const TerminalStep = (highlight, control) => (
  <div style={control ? codeControlStyle : codeExperimentStyle}>
    <div style={highlight ? outputStyleRed : {}}>
      <Tabs>
        <TabList>
          <Tab>
            Editor
          </Tab>
          <Tab>
            Terminal
          </Tab>
        </TabList>

        <TabPanel>
          <CodeTutorial control={control} num={0} question={`Print "Hello World" to the console.`} language="python" />
        </TabPanel>
        <TabPanel>
          <Terminal num={0} />
        </TabPanel>
      </Tabs>
    </div>
  </div>
);

const CodexStep = (highlight) => (
  <div style={{ width: '50%', margin: '5px' }}>
    <div style={highlight ? outputStyle : {}}>
      <CodexTutorial num={0} language="python" />
    </div>
  </div>
);

const DoneStep = (highlight, callback) => (
  <div style={{ width: 'max-content' }}>
    <button
      style={highlight ? outputStyle : {}}
      type="button"
      onClick={callback}
    >
      Done
    </button>
  </div>
);

const getInstruction = (idx, control) => {
  const controlList = {
    1: [
      'The highlighted text is the question that you are trying to solve.',
      'Later in this tutorial, there will be a text editor where you can write code to solve this problem.',
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    2: [
      'This is the editor where you can write and run code.',
      `Pressing the "Editor" tab will bring you back to the editor.`,
      `Pressing "Run" will run your code and display the result in the bottom box.`,
      `Try running "print(5)"`,
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    3: [
      'This is the terminal where you can run commands on the command line',
      `You'll need to switch to it by pressing the "Terminal" tab.`,
      `Pressing "Run" will run your command in the shell and output the result in the bottom box.`,
      `This may be helpful to check things such as the language version being used - i.e. "python --version", "java --version", "node --version", and "gcc --version"`,
      `Try running "echo $SHELL"`,
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    7: [
      `Pressing "Done" will submit your answer and you will no longer be able to make changes to it.`,
      `Try and solve the original question!`,
      `Press "Continue" when complete.`,
    ],
    8: [`Once you feel comfortable, press "Next" to begin the study.`],
  };
  const experimentList = {
    1: [
      'The highlighted text is the question that you are trying to solve.',
      'Later in this tutorial, there will be a text editor where you can write code to solve this problem.',
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    2: [
      'This is the editor where you can write and run code.',
      `Pressing the "Editor" tab will bring you back to the editor.`,
      `Pressing "Run" will run your code and display the result in the bottom box.`,
      `Pressing "Copy to AI" will copy your code into a text box for an AI Assistant, which will appear in a later part of this tutorial. Note: This will overwrite any text currently in that box!`,
      `Try running "print(5)"`,
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    3: [
      `Switch to the terminal by pressing the "Terminal" tab.`,
      'This is the terminal where you can run commands on the command line',
      `Pressing "Run" will run your command in the shell and output the result in the bottom box.`,
      `This may be helpful to check things such as the language version being used - i.e. "python --version", "java --version", "node --version", and "gcc --version"`,
      `Try running "echo $SHELL"`,
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    4: [
      'This is the AI editor where you can submit queries to the AI Assistant. Queries can be code, comments, or text.',
      `Pressing "Query" will send your text to an AI which will return what it thinks will come next. This result will be appended to the end of your text.`,
      `Pressing "Requery" will re-submit your previous query to the AI and overwrite what the AI previously appended to your text.`,
      `Pressing "Copy to Code Editor" will copy the text from the AI's output into the Editor. Note: This will overwrite any code in the Editor!`,
      `The "Temperature" slider controls how creative the response from the AI is. The value "0" is deterministic, but higher values may produce a diverse variety of results on each run.`,
      `The "Response Length" slider controls how much text the AI will generate.`,
      `Since "Query" and "Requery" may take a while to complete, a spinning green wheel will appear next to the buttons while waiting for a response.`,
      `Press "Continue" to continue on to the next step of this tutorial.`,
    ],
    5: [`Try making a query! Try querying:

"""
Function that outputs hello world
"""`,
    `Press "Continue" to continue on to the next step of this tutorial.`],
    6: [`Try making a query! Try querying:

def hello_world(): `,
    `Press "Continue" to continue on to the next step of this tutorial.`],
    7: [
      `Pressing "Done" will submit your answer and you will no longer be able to make changes to it.`,
      `Try and solve the original question!`,
      `Press "Continue" when complete.`,
    ],
    8: [`Once you feel comfortable, press "Next" to begin the study.`],
  };
  const instructionList = control ? controlList : experimentList;
  if (idx in instructionList) {
    return (
      <Instruction instruction={instructionList[idx]} red={idx === 3} />
    );
  }
  return (
    <div />
  );
};

const BackButton = (callback) => (
  <button
    type="button"
    onClick={callback}
  >
    Go Back
  </button>
);

const ContinueButton = (callback) => (
  <button
    type="button"
    onClick={callback}
  >
    Continue
  </button>
);

const Tutorial = function Tutorial(props) {
  const {
    id,
    control,
    updateCurrTime,
  } = props;

  // step holds the step of the tutorial
  const [step, setStep] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: '50%', margin: '5px' }}>
          <p>{id}</p>
          <h1>Tutorial</h1>
          {step !== 0 ? BackButton(() => setStep(getPrevStep(step, control))) : <div />}
          {step !== 8 ? ContinueButton(() => setStep(getNextStep(step, control))) : <div />}
          {step === 1 ? QuestionStep(true) : <div />}
          {step > 1 && step < 8 ? QuestionStep(false) : <div />}
        </div>
        <div style={{ width: '50%', margin: '5px' }}>
          {getInstruction(step, control)}
        </div>
      </div>

      <div style={rowStyle}>
        {step === 2 ? EditorStep(true, control) : <div />}
        {step === 3 ? TerminalStep(true, control) : <div />}
        {step > 3 && step < 8 ? TerminalStep(false, control) : <div />}
        {step === 4 ? CodexStep(true) : <div />}
        {step > 4 && step < 8 && !control ? CodexStep(false) : <div />}
      </div>
      {step === 7 ? DoneStep(true, () => setIsOpen(true)) : <div />}
      {step === 8
        ? (
          <NextButton
            onClick={() => {
              // set currTime to Date.now() so that Question 1's timing starts
              // as it loads
              const newTime = Date.now();
              updateCurrTime(newTime);
            }}
          />
        )
        : <div />}
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={modalStyle}
        onRequestClose={() => setIsOpen(false)}
      >
        <ConfirmationTutorial close={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  control: state.app.control,
});

const mapDispatchToProps = (dispatch) => ({
  updateID: (id) => (dispatch(updateUserIDAction(id))),
  updateCurrTime: (time) => (dispatch(updateCurrTimeAction(time))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tutorial);
