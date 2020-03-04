import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { executeCode } from '../actions';

const RunButton = ({ loading, executeCode, code }) => (
  <button
    onClick={() => executeCode(code)}
    disabled={loading}
    className="btn btn-success"
    type="button"
  >
    <span>Run</span>
    &nbsp;
    {loading ? (
      <i className="fas fa-spinner fa-spin" />
    ) : (
      <i className="fas fa-play-circle" />
    )}
  </button>
);

RunButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  executeCode: PropTypes.func.isRequired
};
const mapStateToProps = ({ code }) => ({
  loading: code.loading,
  code: code.code
});

export default connect(mapStateToProps, { executeCode })(RunButton);
