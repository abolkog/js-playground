import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Output extends Component {
  renderResult() {
    const { error, result } = this.props;
    if (error) {
      return <div className="error">{error}</div>;
    }

    if (result.length > 0) {
      return result.map((item, index) => (
        <div key={index}>
          <pre>
            <span style={{ marginRight: 5 }}>&#x2023;</span>

            <span>{item}</span>
          </pre>
        </div>
      ));
    }
    return <></>;
  }

  render() {
    return (
      <div style={{ width: '100%', height: '90%' }} className="console">
        {this.renderResult()}
      </div>
    );
  }
}

Output.propTypes = {
  error: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = ({ code }) => ({
  result: code.result.map(item => item),
  error: code.error
});

export default connect(mapStateToProps)(Output);
