import {
  React,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import useCountDown from 'react-countdown-hook';
import Question from './Question';
import OutOfTime from './OutOfTime';
import actions from './actions/index';

const { ipcRenderer } = window.require('electron');

const {
  updateQuestionTabAction,
  updateCurrTimeAction,
  updateQuestionTimeAction,
} = actions;

const padding = { padding: '30px' };

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const padTime = (num) => {
  let pad = num;
  if (pad < 10) {
    pad = pad.toString().padStart(2, '0');
  }
  return pad;
};

const convertMS = (ms) => {
  let h;
  let m;
  let s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s %= 60;
  h = Math.floor(m / 60);
  m %= 60;
  const d = Math.floor(h / 24);
  h %= 24;
  h += d * 24;

  m = padTime(m);

  return `${h}h, ${m}m`;
};

const Questions = function Questions(props) {
  const {
    id,
    order,
    control,
    tab,
    questions,
    remainingQuestions,
    times,
    currTime,
    updateQuestionTab,
    updateCurrTime,
    updateQuestionTime,
  } = props;

  const initialTime = 2 * 60 * 60 * 1000; // initial time in milliseconds, (2 hours)
  const interval = 1000; // interval to change remaining time amount, defaults to 1000

  const [
    timeLeft,
    {
      start,
      pause,
      resume,
      reset,
    },
  ] = useCountDown(initialTime, interval);

  // start the timer during the first render
  useEffect(() => {
    start();
  }, []);

  // reorders the questions
  const newQuestions = order.reduce(
    (prev, curr, idx) => ({
      ...prev,
      [idx + 1]: questions[curr],
    }),
    {},
  );

  const questionsToDisplay = remainingQuestions.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: newQuestions[curr],
    }),
    {},
  );

  // eslint-disable-next-line
  const tabs = Object.entries(questionsToDisplay).map(([k, v]) => (
    <Tab key={`Tab ${k}`}>
      {`Question ${k}`}
    </Tab>
  ));
  const tabPanels = Object.entries(questionsToDisplay).map(([k, v]) => (
    <TabPanel key={`Question ${k}`}>
      <Question
        num={k}
        question={v.question}
        language={v.language}
        control={control}
      />
    </TabPanel>
  ));

  if (timeLeft === 0) {
    return (
      <OutOfTime />
    );
  }
  return (
    <div style={padding}>
      <div style={rowStyle}>
        <p style={{ width: '90%', margin: '5px' }}>{id}</p>
        <h2 style={{ width: '10%', margin: '5px' }}>{`Time Left: ${convertMS(timeLeft)}`}</h2>
      </div>
      <h2>Questions can be answered in any order</h2>

      <Tabs
        selectedIndex={tab}
        onSelect={(curr, prev) => {
          // get sorted list of remaining questions to map tab index to question number
          const sortedRemainingQuestions = Object.keys(questionsToDisplay).sort();
          const timesIndex = +sortedRemainingQuestions[prev] - 1;
          console.log(timesIndex);
          console.log(sortedRemainingQuestions);
          console.log(times);
          const newTime = Date.now();
          updateQuestionTime(newTime - currTime, timesIndex);
          updateCurrTime(Date.now());
          updateQuestionTab(curr);
        }}
      >
        <TabList>
          {tabs}
        </TabList>

        {tabPanels}
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  order: state.app.questionOrder,
  control: state.app.control,
  questions: state.app.questions,
  remainingQuestions: state.app.remainingQuestions,
  tab: state.app.questionTab,
  currTime: state.timing.currTime,
  times: state.timing.times,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuestionTab: (tab) => (dispatch(updateQuestionTabAction(tab))),
  updateCurrTime: (time) => (dispatch(updateCurrTimeAction(time))),
  updateQuestionTime: (time, index) => (dispatch(updateQuestionTimeAction(time, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questions);
