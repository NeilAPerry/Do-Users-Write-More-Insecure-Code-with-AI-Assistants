import { React } from 'react';
import PropTypes from 'prop-types';

const SelectAll = function SelectAll(props) {
  const {
    question,
    choices,
    selected,
    onChange,
  } = props;
  const boxes = choices.map((choice, idx) => (
    <div key={question + idx + new Date().getTime()}>
      <input
        type="checkbox"
        name={question}
        value={choice}
        checked={selected.includes(choice)}
        onChange={(event) => {
          event.stopPropagation();
          const elem = event.target.value;
          let newSelected;
          // add to answer if not in answer
          if (!selected.includes(elem)) {
            newSelected = [...selected, elem].sort();
          } else {
            // remove from answer if in answer
            newSelected = [
              ...selected.slice(0, selected.indexOf(elem)),
              ...selected.slice(selected.indexOf(elem) + 1),
            ];
          }
          onChange(newSelected);
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

SelectAll.propTypes = {
  question: PropTypes.string.isRequired,
  choices: PropTypes.instanceOf(Array).isRequired,
  selected: PropTypes.instanceOf(Array).isRequired,
};

export default SelectAll;
