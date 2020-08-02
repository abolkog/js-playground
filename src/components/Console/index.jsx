import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Console = ({ history }) => {
  const createKey = index => {
    return `key${index}`;
  };

  if (history.length === 0) {
    return <></>;
  }
  return (
    <div className="console">
      {history.map((item, index) => (
        <div key={createKey(index)}>
          <pre>
            <span style={{ marginRight: 5 }}>&#8250;</span>

            <span>{item}</span>
          </pre>
        </div>
      ))}
    </div>
  );
};

Console.propTypes = {
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ common }) => ({
  history: common.history.map(item => item),
});

export default connect(mapStateToProps)(Console);
