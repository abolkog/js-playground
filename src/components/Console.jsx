import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Console extends Component {
  showConsoleHistory() {
    const { history } = this.props;

    if (history.length > 0) {
      return history.map((item, index) => (
        <div key={index}>
          <pre>
            <span style={{ marginRight: 5 }}>&#8250;</span>

            <span>{item}</span>
          </pre>
        </div>
      ));
    }
    return <></>;
  }

  render() {
    return <div className="console">{this.showConsoleHistory()}</div>;
  }
}

Console.propTypes = {
  history: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = ({ logs }) => ({
  history: logs.history.map(item => item)
});

export default connect(mapStateToProps)(Console);
