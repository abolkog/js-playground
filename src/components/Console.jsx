import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class Console extends Component {
  displayConsoleLog() {
    const { logs } = this.props;
    if (logs) {
      return (
        <>
          {logs.map((msg, index) => (
            <div style={{ margin: 10 }} key={index}>
              {msg}
            </div>
          ))}
        </>
      );
    }

    return <></>;
  }
  render() {
    return (
      <div style={{ width: "100%" }} className="console">
        {this.displayConsoleLog()}
      </div>
    );
  }
}

Console.propTypes = {
  logs: PropTypes.any
};

const mapStateToProps = ({ code }) => ({
  logs: code.logs,
  result: code.result
});

export default connect(mapStateToProps)(Console);
