import React, { Component } from 'react';
import { connect } from 'react-redux';

class Output extends Component {
  _renderResult() {
    const { error, result } = this.props;
    if (error) {
      return <div className='error'>{error}</div>;
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
      <div style={{ width: consoleWidth }} className='console'>
        {this._renderResult()}
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
  return {
    result: code.result,
    error: code.error
  };
};
export default connect(mapStateToProps)(Output);