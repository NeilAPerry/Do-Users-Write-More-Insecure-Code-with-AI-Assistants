import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import PropTypes from 'prop-types';
import Code from './Code';
import Terminal from './Terminal';
import Codex from './Codex';
import FinishQuestion from './FinishQuestion';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const codeExperimentStyle = {
  width: '50%',
  margin: '5px',
  marginTop: '43px',
};

const codeControlStyle = {
  width: '100%',
  margin: '5px',
  marginTop: '43px',
};

const AI = (num, language) => (
  <div style={{ width: '50%', margin: '5px' }}>
    <Codex
      num={num}
      language={language}
    />
  </div>
);

const Question = function Question(props) {
  const {
    num,
    question,
    language,
    control,
  } = props;
  return (
    <div>
      <h3>
        {question}
      </h3>
      {/* <Code num={num} language={language} /> */}
      <div style={rowStyle}>
        {/* 43px lines up the top of the code boxes */}
        <div style={control ? codeControlStyle : codeExperimentStyle}>
          <Tabs>
            <TabList>
              <Tab>
                Editor
              </Tab>
              <Tab>
                Terminal
              </Tab>
            </TabList>

            <TabPanel>
              <Code
                num={num}
                language={language}
              />
            </TabPanel>
            <TabPanel>
              <Terminal num={num} />
            </TabPanel>
          </Tabs>
        </div>
        {control ? <div /> : AI(num, language)}
      </div>
      <FinishQuestion num={num} />
    </div>
  );
};

Question.propTypes = {
  num: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Question;
