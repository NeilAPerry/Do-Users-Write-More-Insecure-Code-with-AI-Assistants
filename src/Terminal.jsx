import React from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import actions from './actions/index';

const {
  updateTerminalInputAction,
  updateTerminalOutputAction,
} = actions;

const { ipcRenderer } = window.require('electron');

const outputStyle = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  minHeight: '300px',
  maxHeight: '300px',
  overflowY: 'scroll',
};

const Terminal = function Terminal(props) {
  const {
    num,
    input,
    updateInput,
    output,
    updateOutput,
  } = props;
  return (
    <div>
      <button
        style={{ rightPadding: "5px" }}
        type="button"
        onClick={() => {
          ipcRenderer.send('exec-command', input);
          ipcRenderer.on('exec-res', (event, arg) => {
            console.log(arg);
            updateOutput(arg);
          });

          // logging
          const log = {
            type: 'SHELL',
            message: {
              command: input,
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
      {` This window allows you to execute system commands. `}
      <b>This is not an interactive shell.</b>
      <CodeEditor
        value={input}
        language=""
        placeholder="Please enter commands."
        minHeight={80}
        minLength={400}
        onChange={(evn) => updateInput(evn.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: '#f5f5f5',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <p style={outputStyle}>{output}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  input: state.terminal.input,
  output: state.terminal.output,
});

const mapDispatchToProps = (dispatch) => ({
  updateInput: (text) => (dispatch(updateTerminalInputAction(text))),
  updateOutput: (text) => (dispatch(updateTerminalOutputAction(text))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Terminal);
