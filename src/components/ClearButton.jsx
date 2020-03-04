import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearHistory } from '../actions';

const ClearButton = ({ clearHistory }) => (
  <button onClick={() => clearHistory()} className="btn btn-info" type="button">
    <span>Clear</span>
    &nbsp;
    <i className="fas fa-trash" />
  </button>
);

ClearButton.propTypes = {
  clearHistory: PropTypes.func.isRequired
};

export default connect(null, { clearHistory })(ClearButton);
