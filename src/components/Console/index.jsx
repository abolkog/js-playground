import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

const Console = ({ history }) => {
  const createKey = index => {
    return `key${index}`;
  };

  if (history.length === 0) {
    return <></>;
  }

  return (
    <div className="console">
      {history.map((item, index) => {
        const resut = !_.isString(item) ? JSON.stringify(item) : item;
        return (
          <div key={createKey(index)}>
            <pre>
              <span style={{ marginRight: 5 }}>&#8250;</span>

              <span>{resut}</span>
            </pre>
          </div>
        );
      })}
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
