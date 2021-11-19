import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Clickable from '../Clickable';
import { commonActions } from '../../store/actions';

const ContextMenu = ({ position, onClose, dispatch }) => {
  if (!position) return null;

  const handleFormatClick = () => {
    dispatch(commonActions.toggleJsonView());
    onClose();
  };
  return (
    <ul
      className="menu"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <li>
        <Clickable onClick={handleFormatClick}>Fromat JSON</Clickable>
      </li>
      <li>
        <Clickable onClick={onClose}>Close</Clickable>
      </li>
    </ul>
  );
};

ContextMenu.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

ContextMenu.defaultProps = {
  position: null,
};

// const mapStateToProps = ({ common }) => ({
//   position: common.position,
// });

export default connect(null)(ContextMenu);
