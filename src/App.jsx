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
import Tutorial from './Tutorial';
import NextButton from './NextButton';
import Consent from './Consent';
import Survey from './Survey';
import Debrief from './Debrief';
import OutOfTime from './OutOfTime';
import Questions from './Questions';

import actions from './actions/index';

import 'react-tabs/style/react-tabs.css';

const {
  updateUserIDAction,
  updateQuestionOrderAction,
  updateControlAction,
  updateQuestionTabAction,
  nextStageAction,
  setStageAction,
  updateCurrTimeAction,
  updateQuestionTimeAction,
  updateCodeInputAction,
} = actions;

const { ipcRenderer } = window.require('electron');

const padding = { padding: '30px' };

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const App = function App(props) {
  const {
    id,
    order,
    control,
    stage,
    questions,
    remainingQuestions,
    tab,
    times,
    currTime,
    code,
    updateID,
    updateOrder,
    updateControl,
    updateQuestionTab,
    nextStage,
    setStage,
    updateCurrTime,
    updateQuestionTime,
    updateInput,
  } = props;

  if (order.length === 0) {
    ipcRenderer.send('req-question-order', '');
    ipcRenderer.on('question-order-res', (event, arg) => {
      // save ordering of questions
      updateOrder(arg);
      // set java starter code to new index
      //       const javaStarter = `
      // class Main {

      //   // Write new function here

      //   public static void main(String[] args) {
      //     // Call new function here for testing
      //     System.out.println("Hello, World - Java!");
      //   }
      // }
      //           `;
      //       const javaIndex = arg.indexOf('3');
      //       updateInput(javaStarter, javaIndex);
    });
    return (
      <p>Loading</p>
    );
  }

  if (id === '') {
    ipcRenderer.send('get-id', '');
    ipcRenderer.on('id-res', (event, arg) => {
      updateID(arg);
    });
    return (
      <p>Loading</p>
    );
  }
  if (control === null) {
    ipcRenderer.send('get-control', '');
    ipcRenderer.on('control-res', (event, arg) => {
      updateControl(arg === 'true');
    });
    return (
      <p>Loading</p>
    );
  }

  switch (stage) {
    case 0:
      return (
        <div style={padding}>
          <Consent />
        </div>
      );
    case 1:
      return (
        <div style={padding}>
          <Tutorial />
        </div>
      );
    case 2:
      return (
        <Questions />
      );
    case 3:
      return (
        <div style={padding}>
          <Survey />
        </div>
      );
    case 4:
      return (
        <div style={padding}>
          <Debrief />
        </div>
      );
    case 5:
      return (
        <div style={padding}>
          <h1>Done!</h1>
        </div>
      );
    default:
      return (
        <div />
      );
  }
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  order: state.app.questionOrder,
  control: state.app.control,
  stage: state.app.stage,
  questions: state.app.questions,
  remainingQuestions: state.app.remainingQuestions,
  tab: state.app.questionTab,
  currTime: state.timing.currTime,
  times: state.timing.times,
  code: state.code,
});

const mapDispatchToProps = (dispatch) => ({
  updateID: (id) => (dispatch(updateUserIDAction(id))),
  updateOrder: (order) => (dispatch(updateQuestionOrderAction(order))),
  updateControl: (control) => (dispatch(updateControlAction(control))),
  updateQuestionTab: (tab) => (dispatch(updateQuestionTabAction(tab))),
  nextStage: () => (dispatch(nextStageAction())),
  setStage: (stage) => (dispatch(setStageAction(stage))),
  updateCurrTime: (time) => (dispatch(updateCurrTimeAction(time))),
  updateQuestionTime: (time, index) => (dispatch(updateQuestionTimeAction(time, index))),
  updateInput: (text, index) => (dispatch(updateCodeInputAction(text, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
