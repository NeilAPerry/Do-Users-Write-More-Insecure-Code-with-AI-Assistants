import React from 'react';
import { connect } from 'react-redux';
import actions from './actions/index';

const {
  finishQuestionAction,
  updateQuestionTabAction,
  nextStageAction,
  updateCurrTimeAction,
  updateQuestionTimeAction,
} = actions;

const { ipcRenderer } = window.require('electron');

const Confirmation = function Confirmation(props) {
  const {
    num,
    close,
    code,
    remainingQuestions,
    currTime,
    times,
    finishQuestion,
    updateQuestionTab,
    nextStage,
    updateCurrTime,
    updateQuestionTime,
  } = props;
  const index = Number(num) - 1;
  const {
    input,
  } = code[index];
  return (
    <div>
      <h3>Are you sure you are done?</h3>
      <button
        type="button"
        onClick={() => {
          finishQuestion(num);
          // update timing info - finished question's timing index is num - 1
          const timesIndex = (+num) - 1;
          const newTime = Date.now();
          const timeToAdd = newTime - currTime;
          ipcRenderer.send(
            'save-question',
            {
              num,
              answer: input,
              time: timeToAdd + times[timesIndex],
            },
          );
          updateQuestionTime(timeToAdd, timesIndex);
          updateCurrTime(Date.now());
          // if there are questions left, the 0th tab will always be there so
          // it is safe to make that the active tab
          updateQuestionTab(0);
          // remainingQuestions still contains the question that was removed by
          // finishQuestion(num) since it came from the redux state before
          // it was changed. So now remainingQuestions has 1 entry here but not
          // in the redux state. This is why the check is === 1 instead of === 0.
          if (remainingQuestions.length === 1) {
            // move on to survey questions
            nextStage();
          }
        }}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={close}
      >
        No
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  code: state.code,
  remainingQuestions: state.app.remainingQuestions,
  currTime: state.timing.currTime,
  times: state.timing.times,
});

const mapDispatchToProps = (dispatch) => ({
  finishQuestion: (question) => (dispatch(finishQuestionAction(question))),
  updateQuestionTab: (tab) => (dispatch(updateQuestionTabAction(tab))),
  nextStage: (stage) => (dispatch(nextStageAction(stage))),
  updateCurrTime: (time) => (dispatch(updateCurrTimeAction(time))),
  updateQuestionTime: (time, index) => (dispatch(updateQuestionTimeAction(time, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirmation);
