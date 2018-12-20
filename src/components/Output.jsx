import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

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
    const { width } = this.props;
    const windowWith = window.innerWidth - 50;
    const consoleWidth = windowWith - width;
    return (
      <div style={{ width: consoleWidth }} className="console">
        {this.renderResult()}
      </div>
    );
  }
}

Output.propTypes = {
  error: PropTypes.any,
  result: PropTypes.any,
  width: PropTypes.number.isRequired
};

const mapStateToProps = ({ code }) => ({
  result: code.result,
  error: code.error
});

export default connect(mapStateToProps)(Output);
