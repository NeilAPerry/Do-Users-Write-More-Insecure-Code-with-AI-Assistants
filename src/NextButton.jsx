import React from 'react';
import { connect } from 'react-redux';
import actions from './actions/index';

const {
  nextStageAction,
} = actions;

const NextButton = function NextButton(props) {
  const {
    onClick,
    nextStage,
  } = props;

  return (
    <button
      type="button"
      onClick={() => {
        if (onClick !== undefined) {
          onClick();
        }
        nextStage();
      }}
    >
      Next
    </button>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  nextStage: (stage) => (dispatch(nextStageAction(stage))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NextButton);
