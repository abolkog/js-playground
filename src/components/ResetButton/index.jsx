/* eslint-disable */
import React from 'react';

import { connect } from 'react-redux';
import { commonActions } from '../../store/actions';

const ResetButton = ({ dispatch }) => {
  const handleClick = () => {
    const answer = confirm('This will clear history and code. Are you sure?');
    if (answer) {
      dispatch(commonActions.clearHistory(true));
    }
  };
  return (
    <button onClick={handleClick} className="btn btn-danger" type="button">
      <span>Reset</span>
      &nbsp;
      <i className="fas fa-redo" />
    </button>
  );
};

export default connect()(ResetButton);
