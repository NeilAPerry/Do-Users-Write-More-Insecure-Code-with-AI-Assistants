import React from 'react';

const outputStyle = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(0, 0, 0, 1)',
  padding: '10px',
  minHeight: '50px',
  maxHeight: '450px',
  overflowY: 'scroll',
};

const outputStyleRed = {
  whiteSpace: 'pre-wrap',
  border: '1px solid rgba(255, 0, 0, 1)',
  padding: '10px',
  minHeight: '50px',
  maxHeight: '450px',
  overflowY: 'scroll',
};

const Instruction = function Instruction(props) {
  const {
    instruction,
    red,
  } = props;

  const instructionList = instruction.map((i) => (
    <p key={i}>{i}</p>
  ));

  return (
    <div style={red ? outputStyleRed : outputStyle}>
      {instructionList}
    </div>
  );
};

export default Instruction;
