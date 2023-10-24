import React from 'react';
import PropTypes from 'prop-types';

const DropDown = function DropDown(props) {
  const {
    name,
    question,
    choices,
    selected,
    onChange,
  } = props;
  // console.log(props);
  const options = choices.map((choice, idx) => (
    <option key={question + idx} value={choice}>
      {choice}
    </option>
  ));
  return (
    <div>
      <h3>
        {question}
      </h3>
      <select
        name={name}
        onChange={(event) => {
          event.stopPropagation();
          onChange(event.target.value);
        }}
      >
        {options}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  question: PropTypes.string.isRequired,
  choices: PropTypes.instanceOf(Array).isRequired,
  selected: PropTypes.string.isRequired,
};

export default DropDown;
