import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Output extends Component {
  renderResult() {
    const { error, result } = this.props;
    if (error) {
      return <div className="error">{error}</div>;
    }

    if (result) {
      return <div>{JSON.stringify(result)}</div>;
    }
    return <></>;
  }

  render() {
    return (
      <div style={{ width: '100%' }} className="console">
        {this.renderResult()}
      </div>
    );
  }
}

Output.propTypes = {
  error: PropTypes.any,
  result: PropTypes.any
};

const mapStateToProps = ({ code }) => ({
  result: code.result,
  error: code.error
});

export default connect(mapStateToProps)(Output);
