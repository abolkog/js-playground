import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Output = ({ error, result }) => {
  const createKey = index => {
    return `key${index}`;
  };

  if (error) {
    return (
      <div style={{ width: '100%', height: '90%' }} className="console">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (result.length === 0) {
    return <></>;
  }

  return (
    <div style={{ width: '100%', height: '90%' }} className="console">
      {result.map((item, index) => (
        <div key={createKey(index)}>
          <pre>
            <span style={{ marginRight: 5 }}>&#x2023;</span>
            <span>{item}</span>
          </pre>
        </div>
      ))}
    </div>
  );
};

Output.propTypes = {
  error: PropTypes.string.isRequired,
  result: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ code }) => ({
  result: code.result.map(item => item),
  error: code.error,
});

export default connect(mapStateToProps)(Output);
