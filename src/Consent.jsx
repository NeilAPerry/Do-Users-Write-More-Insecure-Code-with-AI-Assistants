/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import actions from './actions/index';
import recordings from './recording';

console.log(recordings);

const { ipcRenderer } = window.require('electron');

const {
  updateScreenRecordingAction,
  updateKeyRecordingAction,
  updateAudioRecordingAction,
  updateTapesAction,
} = actions;

const { startRecording } = recordings;

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const leftStyle = {
  width: '67%',
  margin: '5px',
};
const rightStyle = {
  width: '33%',
  margin: '5px',
};

const upperBoxStyle = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  padding: '10px',
  minHeight: '140px',
};

const lowerBoxStyle = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  padding: '10px',
};

const IRBBox = (
  <div style={upperBoxStyle}>
    <p style={{ color: 'red'}}>IRB Use Only</p>
    <p>Approval Date:   <a href={""}>[Date]</a></p>
    <p>Expiration Date: <a href={""}>(Does not expire)</a></p>
  </div>
);

const TopBox = (
  <div>
    <div style={rowStyle}>
      <div style={leftStyle}>
        <div style={upperBoxStyle}>
          <p style={{ fontSize: '30px' }}>[UNIVERSITY]   Research Consent Form</p>
          <p>Protocol Director:	[Director]</p>
        </div>
      </div>
      <div style={rightStyle}>
        {IRBBox}
      </div>
    </div>
    <p style={lowerBoxStyle}>Protocol Title: [Title]</p>
  </div>
);

const Buttons = (name, callback, choice) => (
  <div>
    <input
      type="radio"
      name={name}
      value={"Yes"}
      checked={choice === 'Yes'}
      onChange={(event) => {
        event.stopPropagation();
        callback(event.target.value);
      }}
    />
    Yes
    <input
      type="radio"
      name={name}
      value={"No"}
      checked={choice === 'No'}
      onChange={(event) => {
        event.stopPropagation();
        callback(event.target.value);
      }}
    />
    No
  </div>
);

const Consent = function Consent(props) {
  const {
    id,
    screen,
    k,
    audio,
    tapes,
    updateScreenRecording,
    updateKeyRecording,
    updateAudioRecording,
    updateTapes,
  } = props;

  return (
    <div>
      <p>{id}</p>
      {TopBox}
      <p>DESCRIPTION:  You are invited to participate in a research study whose purpose is to examine the implications of using AI assistance to write code. You will be asked to solve a series of security-related programming problems on a computer that will be provided to you. As you work through the problems you may have access to an AI to help you formulate solutions. We will analyze your solutions and how you came to them. Our procedures include recording your screen and keystrokes as you solve these problems. This may be shown at scientific meetings and data that results from its analysis may be published in scientific papers. These recordings will be deleted within five years of you participating in this study.</p>
      <p>TIME INVOLVEMENT:  Your participation will take approximately 2 hours.</p>
      <p>RISKS AND BENEFITS:  The foreseeable risks to participants with this study are potential retaliation from employers who observe employees making programming mistakes. To minimize this, your name will not be associated with your performance in the provided tasks. The benefits which may reasonably be expected to result from this study are that participants have the opportunity to experience programming with an AI. Society benefits from learning about what types of mistakes are likely to be made as this practice becomes more common. We cannot and do not guarantee or promise that you will receive any benefits from this study. Your decision whether or not to participate in this study will not affect your employment with [University] or your grades in school.</p>
      <p>PAYMENTS:  You will receive a $30 Amazon Gift Card as payment for your participation.</p>
      <p>PARTICIPANT’S RIGHTS:  If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled.  The alternative is not to participate.  You have the right to refuse to answer particular questions.  The results of this research study may be presented at scientific or professional meetings or published in scientific journals.  Your individual privacy will be maintained in all published and written data resulting from the study.</p>
      <p>Identifiers might be removed from identifiable private information and, after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without additional informed consent from you.</p>
      <p>CONTACT INFORMATION:</p>
      <p><i>Questions:  </i>If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact codingenv-study2022@stanford.edu.</p>
      <p><i>Independent Contact:  </i>If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906, or email at <a href={'mailto:irbnonmed@stanford.edu'}>irbnonmed@stanford.edu</a>.  You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.</p>
      <p><i>Appointment Contact:  </i>If you need to change your appointment, please contact codingenv-study2022@stanford.edu.</p>
      <p>Indicate <i>Yes</i> or <i>No</i>:</p>
      <p>I give consent to have my screen recorded during this study.</p>
      {Buttons('screenRecording', updateScreenRecording, screen)}
      <p>I give consent to have my keystrokes recorded during this study.</p>
      {Buttons('keyRecording', updateKeyRecording, k)}
      <p>I give consent to have my audio recorded during this study. Audio recordings will be used to better qualitatively understand and verify user actions we observe from screen recordings. These recordings may be listened to by research investigators during meetings.</p>
      {Buttons('audioRecording', updateAudioRecording, audio)}
      <p>I give consent for tapes resulting from this study to be used for examining how answers to problems were formed.</p>
      {Buttons('tapes', updateTapes, tapes)}
      <p>If you are coming in-person to research visits, you are required to be fully vaccinated—2 doses (1 for Johnson and Johnson), 2 weeks out and to provide proof of your vaccination (e.g., CDC COVID-19 Vaccination Card, e-Health record, etc.) to the researcher prior to study participation.  Alternately, you can provide a negative COVID test within 72 hours of your visit.</p>
      <p>The extra copy of this consent form is for you to keep.</p>
      <br />
      <NextButton
        onClick={() => {
          ipcRenderer.send(
            'save-consent',
            {
              screen,
              key: k,
              audio,
              tapes,
            },
          );
          if (screen === 'Yes') {
            startRecording(`${id}`, audio);
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  id: state.app.id,
  screen: state.consent.screen,
  k: state.consent.key,
  audio: state.consent.audio,
  tapes: state.consent.tapes,
});

const mapDispatchToProps = (dispatch) => ({
  updateScreenRecording: (screen) => (dispatch(updateScreenRecordingAction(screen))),
  updateKeyRecording: (key) => (dispatch(updateKeyRecordingAction(key))),
  updateAudioRecording: (audio) => (dispatch(updateAudioRecordingAction(audio))),
  updateTapes: (tapes) => (dispatch(updateTapesAction(tapes))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Consent);
