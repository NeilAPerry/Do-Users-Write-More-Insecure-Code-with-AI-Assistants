/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import MultipleChoice from './MultipleChoice';
import SelectAll from './SelectAll';
import Input from './Input';
import NextButton from './NextButton';
import actions from './actions/index';

const { ipcRenderer } = window.require('electron');

const {
  updateUserIDAction,
  updateDebriefSharingAction,
  updateDebriefPermissionAction,
} = actions;

const Survey = function Survey(props) {
  const {
    id,
    permission,
    debrief,
    updateShare,
    updatePermission,
  } = props;

  return (
    <div>
      <p>{id}</p>
      <p><b>Project Title:</b> Examining Code Produced by Humans using AI</p>
      <p><b>Investigators:</b> Neil Perry, Megha Srivastava, Dan Boneh</p>
      <p>Thank you for participating in this study. In order to get the information we were looking for, we withheld some information about some aspects of this study. Sometimes in research it is necessary to withhold information about the purpose of an experiment because it might affect the results. If we tell people the purpose of our experiment, they may deliberately do whatever they think we want them to do, or even deliberately act in the opposite direction, preventing us from reliably assessing how participants would act in the situation normally.
        Now that the experiment is over, we will describe the full study to you, answer any of your questions, and provide you with the opportunity to make a decision about whether you would like to have your data included in the study.
      </p>
      <p><b>What the study is really about</b></p>
      <p>We asked participants to complete a set of programming tasks, sometimes by interacting with an Artificially Intelligent (AI) code assistant (including OpenAI’s Codex model). The purpose of our study is to document the security of the code users write with or without assistance from the AI system. We examine and analyze all code written by participants for possible security vulnerabilities, which may range from safe use of standard cryptography libraries to common web security problems. We do not mention the specific goal of assessing code security to participants before-hand in order to understand how often different users commonly account for possible security vulnerabilities when writing code.</p>
      <p><b>Sharing information about this study</b></p>
      <p>We have lots of people participating in this study throughout this quarter. The success of this study requires that participants do not know in advance what this study is about, and do not know that we will be looking for security vulnerabilities in their code. It is therefore crucial to our data validity that you refrain from discussing the full details of this experiment to anyone.</p>
      <p>Do you understand why it is important to not discuss this study with others?</p>
      <input
        type="radio"
        name={"privacy"}
        value={"Yes"}
        // checked={}
        onChange={(event) => {
          event.stopPropagation();
          updateShare(event.target.value);
        }}
      />
      Yes
      <input
        type="radio"
        name={"privacy"}
        value={"No"}
        // checked={}
        onChange={(event) => {
          event.stopPropagation();
          updateShare(event.target.value);
        }}
      />
      No
      <p><b>Taking part is voluntary</b></p>
      <p>Finally, although you have already completed the study, your involvement is voluntary and you may choose to withdraw the data you provided prior to this debriefing, without penalty or loss of compensation. Withdrawing your submission will not adversely affect your relationship with Stanford University, the researchers, or any of our affiliates.</p>
      <p><b>Please indicate below if you DO or DO NOT give permission to have your data included in the study </b></p>
      <p>I have been debriefed by the Research team, and I understand the true intent and purpose of my participation in the study. I DO give permission that the data collected during the study may be included for the purpose of the study.</p>
      <input
        type="checkbox"
        name={"debrief-yes"}
        value={"Yes"}
        checked={permission === "Yes"}
        onChange={(event) => updatePermission(event.target.value)}
      />
      Yes, I DO give permission
      <p>I have been debriefed by the Research team, and I understand the true intent and purpose of my participation in the study. I DO NOT give permission that the data collected during the study may be included for the purpose of the study. </p>
      <input
        type="checkbox"
        name={"debrief-no"}
        value={"No"}
        checked={permission === "No"}
        onChange={(event) => updatePermission(event.target.value)}
      />
      No, I DO NOT give permission
      <br />
      <NextButton
        onClick={() => (ipcRenderer.send('save-debrief', debrief))}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  permission: state.debrief.permission,
  debrief: state.debrief,
});

const mapDispatchToProps = (dispatch) => ({
  updateID: (id) => (dispatch(updateUserIDAction(id))),
  updateShare: (sharing) => (dispatch(updateDebriefSharingAction(sharing))),
  updatePermission: (permission) => (dispatch(updateDebriefPermissionAction(permission))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);
