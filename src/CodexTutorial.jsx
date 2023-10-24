import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import ReactSlider from 'react-slider';
import LoadingSpin from "react-loading-spin";
import OpenAI from 'openai-api';
import styled from 'styled-components';
import actions from './actions/index';

const {
  loadCodex,
  updateCodexKeyAction,
  updateTutorialCodeInputAction,
  updateTutorialCodexInputTextAction,
  updateTutorialCodexResponseAction,
  updateTutorialCodexInputTempAction,
  updateTutorialCodexResponseLengthAction,
  startTutorialSpinCodex,
  endTutorialSpinCodex,
} = actions;

const { ipcRenderer } = window.require('electron');

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

// eslint-disable-next-line
const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props) => (props.index === 1 ? '#ddd' : '#0f0')};
    border-radius: 999px;
`;

// eslint-disable-next-line
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

// eslint-disable-next-line
const Spin = (loading) => (loading ? <LoadingSpin size="10px" width="2px" /> : <div />);

let openai;

class CodexTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      load,
      updateKey,
    } = this.props;
    ipcRenderer.send('req-api-key', '');
    ipcRenderer.on('api-key-res', (event, arg) => {
      load();
      updateKey(arg);
      openai = new OpenAI(arg);
    });
  }

  changeText(value) {
    const {
      updateText,
      updateRes,
    } = this.props;

    // once the user makes changes to text box,
    // make this the new text input with no res
    updateText(value);
    updateRes('');
  }

  // maybe change it so that start.js keeps the key and queries
  // and use an ipc to pass and receive queries and responses
  async Query(prompt, type) {
    const {
      startSpin,
      endSpin,
      text,
      res,
      temp,
      spin,
      length,
      updateText,
      updateRes,
    } = this.props;

    startSpin();

    const scaledTemp = temp / 100;
    const gptResponse = await openai.complete({
      engine: 'code-davinci-002',
      prompt,
      maxTokens: length,
      temperature: scaledTemp,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["testing"],
    });

    const queryRes = gptResponse.data.choices[0].text;

    updateText(prompt);
    updateRes(queryRes);
    endSpin();
  }

  render() {
    const {
      loaded,
      language,
      text,
      res,
      temp,
      spin,
      length,
      updateTemp,
      updateLength,
      copyToCode,
    } = this.props;

    if (loaded) {
      return (
        <div>
          <h1>AI Assistant</h1>
          <div style={{ overflow: "hidden" }}>
            <button
              type="button"
              onClick={() => {
                this.Query(text + res, 'query');
              }}
              style={{ float: "left" }}
            >
              Query
            </button>
            <button
              type="button"
              onClick={() => {
                console.log(`about to query:\n${text}`);
                this.Query(text, 'requery');
              }}
              style={{ float: "left" }}
            >
              Requery
            </button>
            <button
              type="button"
              onClick={() => {
                copyToCode(text + res);
              }}
              style={{ float: "left" }}
            >
              Copy to Code Editor
            </button>
            <button
              type="button"
              onClick={() => this.changeText('')}
              style={{ float: "left" }}
            >
              Clear
            </button>
            <div style={{ marginLeft: "10px", float: "left" }}>
              {Spin(spin)}
            </div>
          </div>
          <CodeEditor
            value={text + res}
            language={language}
            placeholder={`Please enter ${language} code or comments.`}
            minHeight={400}
            minLength={400}
            onChange={(evn) => this.changeText(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: '#f5f5f5',
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
          <p>
            Temperature (AI Creativity)
          </p>
          <StyledSlider
            defaultValue={temp}
            renderTrack={Track}
            renderThumb={Thumb}
            // needs to take 2 args: thumb value and thumb index (var index is index of redux state)
            // eslint-disable-next-line
            onChange={(value, _) => updateTemp(value)}
          />
          <p>
            Response Length
          </p>
          <StyledSlider
            defaultValue={length}
            renderTrack={Track}
            renderThumb={Thumb}
            max={200}
            // needs to take 2 args: thumb value and thumb index (var index is index of redux state)
            // eslint-disable-next-line
            onChange={(value, _) => updateLength(value)}
          />
        </div>
      );
    }
    return <h1>loading</h1>;
  }
}

const mapStateToProps = (state) => ({
  loaded: state.codex.loaded,
  apiKey: state.codex.apiKey,
  text: state.tutorial.codex.text,
  res: state.tutorial.codex.res,
  temp: state.tutorial.codex.temp,
  spin: state.tutorial.codex.spin,
  length: state.tutorial.codex.length,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => (dispatch(loadCodex())),
  startSpin: () => (dispatch(startTutorialSpinCodex())),
  endSpin: () => (dispatch(endTutorialSpinCodex())),
  updateKey: (apiKey) => (dispatch(updateCodexKeyAction(apiKey))),
  updateText: (text) => (dispatch(updateTutorialCodexInputTextAction(text))),
  updateTemp: (temp) => (dispatch(updateTutorialCodexInputTempAction(temp))),
  updateLength: (len) => (dispatch(updateTutorialCodexResponseLengthAction(len))),
  updateRes: (text) => (dispatch(updateTutorialCodexResponseAction(text))),
  copyToCode: (text) => (dispatch(updateTutorialCodeInputAction(text))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodexTutorial);
