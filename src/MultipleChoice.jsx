import React from 'react';
import PropTypes from 'prop-types';

const MultipleChoice = function MultipleChoice(props) {
  const {
    name,
    question,
    choices,
    selected,
    onChange,
  } = props;
  // console.log(props);
  const boxes = choices.map((choice, idx) => (
    <div key={question + idx}>
      <input
        type="radio"
        name={name}
        value={choice}
        checked={selected === choice}
        onChange={(event) => {
          event.stopPropagation();
          onChange(event.target.value);
        }}
      />
      {choice}
      <br />
    </div>
  ));
  return (
    <div>
      <h3>
        {question}
      </h3>
      {boxes}
    </div>
  );
};

MultipleChoice.propTypes = {
  question: PropTypes.string.isRequired,
  choices: PropTypes.instanceOf(Array).isRequired,
  selected: PropTypes.string.isRequired,
};

export default MultipleChoice;
