import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Clickable = ({ onClick, children }) => {
  return (
    <button className="clickable" type="button" onClick={onClick} aria-label="clickable">
      {children}
    </button>
  );
};

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Clickable;
