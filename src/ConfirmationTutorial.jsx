import React from 'react';
import { connect } from 'react-redux';
import actions from './actions/index';

const { ipcRenderer } = window.require('electron');

const ConfirmationTutorial = function ConfirmationTutorial(props) {
  const {
    close,
  } = props;

  return (
    <div>
      <h3>Are you sure you are done?</h3>
      <button
        type="button"
        onClick={close}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={close}
      >
        No
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationTutorial);
