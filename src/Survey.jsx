import React from 'react';
import { connect } from 'react-redux';
import MultipleChoice from './MultipleChoice';
import SelectAll from './SelectAll';
import Input from './Input';
import NextButton from './NextButton';
import actions from './actions/index';
import recordings from './recording';

const { ipcRenderer } = window.require('electron');

const baseURL = "https://stanforduniversity.qualtrics.com/jfe/form/SV_8f96U3D7rlu0jXg";

const {
  updateUserIDAction,
  updateSurveyProblemAction,
  updateSurveyDemographicAction,
} = actions;

const { stopRecording } = recordings;

const Survey = function Survey(props) {
  const {
    id,
    problemList,
    problemQuestions,
    demographicQuestions,
    updateDem,
    updateProblem,
  } = props;

  console.log(id);
  const newURL = `${baseURL}?id=${id}`;
  console.log(newURL);
  // Simply return the URL with ID of participant embedded
  return (
    <div>
      <h2> Survey </h2>
      Please click the following link to complete our exit survey:
      <a href={newURL} onClick={() => stopRecording(id)}>
        {newURL}
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  problemList: state.app.questions,
  problemQuestions: state.survey.problemQuestions,
  demographicQuestions: state.survey.demographicQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  updateID: (id) => (dispatch(updateUserIDAction(id))),
  updateProblem: (questionID, answer, index) => (dispatch(updateSurveyProblemAction(
    questionID,
    answer,
    index,
  ))),
  updateDem: (answer, index) => (dispatch(updateSurveyDemographicAction(answer, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);
