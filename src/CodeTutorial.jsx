import { React, useState } from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import actions from './actions/index';

const {
  updateTutorialCodexInputTextAction,
  updateTutorialCodeInputAction,
  updateTutorialCodeOutputAction,
} = actions;

const { ipcRenderer } = window.require('electron');

const outputStyleGood = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  minHeight: '300px',
  maxHeight: '300px',
  overflowY: 'scroll',
};

const outputStyleBad = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  minHeight: '300px',
  maxHeight: '300px',
  overflowY: 'scroll',
  color: 'red',
};

const CopyToAIButton = (copyToCodex, input) => (
  <button
    type="button"
    onClick={() => copyToCodex(input)}
  >
    Copy to AI
  </button>
);

const CodeTutorial = function CodeTutorial(props) {
  const {
    control,
    num,
    language,
    input,
    output,
    red,
    updateInput,
    updateOutput,
    copyToCodex,
  } = props;
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const questionState = {
            num,
            language,
            input,
            index: null,
          };
          ipcRenderer.send('run-program', questionState);
          ipcRenderer.on('program-res', (event, arg) => {
            const { reply, error } = arg;
            updateOutput(reply, error);
          });
        }}
      >
        Run
      </button>
      {control ? <div /> : CopyToAIButton(copyToCodex, input)}
      <CodeEditor
        value={input}
        language={language}
        placeholder={`Please enter ${language} code.`}
        minHeight={400}
        minLength={400}
        onChange={(evn) => updateInput(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: '#f5f5f5',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <p style={red ? outputStyleBad : outputStyleGood}>{output}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  input: state.tutorial.code.input,
  output: state.tutorial.code.output,
  red: state.tutorial.code.red,
});

const mapDispatchToProps = (dispatch) => ({
  updateInput: (text) => (dispatch(updateTutorialCodeInputAction(text))),
  updateOutput: (text, error) => (dispatch(updateTutorialCodeOutputAction(text, error))),
  copyToCodex: (text) => (dispatch(updateTutorialCodexInputTextAction(text))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeTutorial);
