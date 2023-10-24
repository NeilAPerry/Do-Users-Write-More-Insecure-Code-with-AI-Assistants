import React from 'react';
import PropTypes from 'prop-types';

const Input = function Input(props) {
  const {
    question,
    selected,
    onChange,
  } = props;

  return (
    <div>
      <h3>
        {question}
      </h3>
      <input
        value={selected}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

Input.propTypes = {
  question: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};

export default Input;
