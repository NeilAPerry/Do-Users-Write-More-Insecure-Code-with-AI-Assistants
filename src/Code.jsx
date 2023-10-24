import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import actions from './actions/index';

const {
  updateCodeInputAction,
  updateCodeOutputAction,
  updateCodexInputTextAction,
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

const CopyToAIButton = (copyToCodex, input, index, num) => (
  <button
    type="button"
    onClick={() => {
      copyToCodex(input, index);

      // logging
      const log = {
        type: 'COPY',
        message: {
          text: input,
        },
        question: num,
        time: new Date(),
        option: 'Editor -> Codex',
      };
      ipcRenderer.send('log', log);
    }}
  >
    Copy to AI
  </button>
);

const Code = function Code(props) {
  const {
    control,
    num,
    language,
    code,
    updateInput,
    updateOutput,
    copyToCodex,
  } = props;
  const index = Number(num) - 1;
  const {
    input,
    output,
    error: red,
  } = code[index];
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // Need to send index to prevent next tab from
          // updating the output to this tab's output
          const questionState = {
            num,
            language,
            input,
            index,
          };
          console.log(questionState);
          ipcRenderer.send('run-program', questionState);
          updateOutput('', false, index);
          ipcRenderer.on('program-res', (event, arg) => {
            const { reply, error, currIndex } = arg;
            updateOutput(reply, error, currIndex);
          });

          // logging
          const log = {
            type: 'RUN',
            message: {
              program: input,
            },
            question: num,
            time: new Date(),
            option: null,
          };
          ipcRenderer.send('log', log);
        }}
      >
        Run
      </button>
      {control ? <div /> : CopyToAIButton(copyToCodex, input, index, num)}
      <CodeEditor
        value={input}
        language={language}
        placeholder={`Please enter ${language} code.`}
        minHeight={400}
        minLength={400}
        onChange={(evn) => updateInput(evn.target.value, index)}
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
  control: state.app.control,
  code: state.code,
});

const mapDispatchToProps = (dispatch) => ({
  updateInput: (text, index) => (dispatch(updateCodeInputAction(text, index))),
  updateOutput: (text, error, index) => (dispatch(updateCodeOutputAction(text, error, index))),
  copyToCodex: (text, index) => (dispatch(updateCodexInputTextAction(text, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Code);
