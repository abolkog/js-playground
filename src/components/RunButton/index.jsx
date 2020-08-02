import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { codeActions } from '../../store/actions';

const RunButton = ({ loading, dispatch, code }) => (
  <button
    data-toggle="tooltip"
    data-placement="top"
    title="Run Code (CtrCmd + R)"
    onClick={() => dispatch(codeActions.executeCode(code))}
    disabled={loading}
    className="btn btn-success"
    type="button"
  >
    <span>Run</span>
    &nbsp;
    {loading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-play-circle" />}
  </button>
);

RunButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
};

const mapStateToProps = ({ code }) => ({
  loading: code.loading,
  code: code.code,
});

export default connect(mapStateToProps)(RunButton);
