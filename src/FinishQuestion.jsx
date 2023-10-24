import { React, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Confirmation from './Confirmation';
import actions from './actions/index';

const {
  finishQuestionAction,
  updateQuestionTabAction,
  nextStageAction,
  updateCurrTimeAction,
  updateQuestionTimeAction,
} = actions;

const { ipcRenderer } = window.require('electron');

Modal.setAppElement(Confirmation);

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

const FinishQuestion = function FinishQuestion(props) {
  const {
    num,
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

  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Done
      </button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={modalStyle}
        onRequestClose={() => setIsOpen(false)}
      >
        <Confirmation num={num} close={() => setIsOpen(false)} />
      </Modal>
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
)(FinishQuestion);
