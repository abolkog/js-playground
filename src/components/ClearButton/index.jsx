import React from 'react';

import { connect } from 'react-redux';
import { commonActions } from '../../store/actions';

const ClearButton = ({ dispatch }) => (
  <button
    onClick={() => dispatch(commonActions.clearHistory())}
    className="btn btn-info"
    type="button"
  >
    <span>Clear</span>
    &nbsp;
    <i className="fas fa-trash" />
  </button>
);

export default connect()(ClearButton);
