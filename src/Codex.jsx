import React from 'react';
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
  updateCodexInputTextAction,
  updateCodexInputTempAction,
  updateCodexResponseAction,
  updateCodexResponseLengthAction,
  updateCodeInputAction,
  startSpinCodex,
  endSpinCodex,
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

class Codex extends React.Component {
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
      // this.setState({
      //   loaded: true,
      //   aiKey: arg,
      // });
      load();
      updateKey(arg);
      openai = new OpenAI(arg);
    });
  }

  changeText(value) {
    const {
      num,
      updateText,
      updateRes,
    } = this.props;
    const index = Number(num) - 1;

    // once the user makes changes to text box,
    // make this the new text input with no res
    updateText(value, index);
    updateRes('', index);
  }

  // maybe change it so that start.js keeps the key and queries
  // and use an ipc to pass and receive queries and responses
  async Query(prompt, type) {
    const {
      num,
      inputs,
      updateText,
      updateRes,
      startSpin,
      endSpin,
    } = this.props;
    startSpin();
    const index = Number(num) - 1;
    const input = inputs[index];
    const {
      text,
      res,
      temp,
      len,
    } = input;
    const scaledTemp = temp / 100;
    // console.log(`In Query():\ntext:${text}\nres:${res}`);
    const gptResponse = await openai.complete({
      engine: 'code-davinci-002',
      prompt,
      maxTokens: len,
      temperature: scaledTemp,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["testing"],
    });

    // console.log(gptResponse.data);
    const queryRes = gptResponse.data.choices[0].text;

    updateText(prompt, index);
    updateRes(queryRes, index);
    endSpin();

    // logging
    const log = {
      type: 'QUERY',
      message: {
        query: prompt,
        temp: scaledTemp,
        len,
        response: queryRes,
      },
      question: num,
      time: new Date(),
      option: type,
    };
    ipcRenderer.send('log', log);
  }

  render() {
    const {
      loaded,
      spin,
      language,
      num,
      inputs,
      updateTemp,
      updateLength,
      copyToCode,
    } = this.props;
    const index = Number(num) - 1;
    const input = inputs[index];
    const {
      text,
      res,
      temp,
      len,
    } = input;
    // console.log(`len: ${len}`);
    // console.log(inputs);

    if (loaded) {
      return (
        <div>
          <h1>AI Assistant</h1>
          <div style={{ overflow: "hidden" }}>
            <button
              type="button"
              onClick={() => {
                // updateText(text + res, index);
                // updateRes('', index);
                // console.log(`about to query:\n${text + res}`);
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
                copyToCode(text + res, index);

                // logging
                const log = {
                  type: 'COPY',
                  message: {
                    text: text + res,
                  },
                  question: num,
                  time: new Date(),
                  option: 'Codex -> Editor',
                };
                ipcRenderer.send('log', log);
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
            onChange={(value, _) => updateTemp(value, index)}
          />
          <p>
            Response Length
          </p>
          <StyledSlider
            defaultValue={len}
            renderTrack={Track}
            renderThumb={Thumb}
            max={200}
            // needs to take 2 args: thumb value and thumb index (var index is index of redux state)
            // eslint-disable-next-line
            onChange={(value, _) => updateLength(value, index)}
          />
        </div>
      );
    }
    return <h1>loading</h1>;
  }
}

const mapStateToProps = (state) => ({
  loaded: state.codex.loaded,
  spin: state.codex.spin,
  apiKey: state.codex.apiKey,
  inputs: state.codex.inputs,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => (dispatch(loadCodex())),
  startSpin: () => (dispatch(startSpinCodex())),
  endSpin: () => (dispatch(endSpinCodex())),
  updateKey: (apiKey) => (dispatch(updateCodexKeyAction(apiKey))),
  updateText: (text, index) => (dispatch(updateCodexInputTextAction(text, index))),
  updateTemp: (temp, index) => (dispatch(updateCodexInputTempAction(temp, index))),
  updateLength: (len, index) => (dispatch(updateCodexResponseLengthAction(len, index))),
  updateRes: (text, index) => (dispatch(updateCodexResponseAction(text, index))),
  copyToCode: (text, index) => (dispatch(updateCodeInputAction(text, index))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Codex);
