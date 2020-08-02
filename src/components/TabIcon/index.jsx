import React from 'react';
import PropTypes from 'prop-types';

const TabIcon = ({ iconWrap, iconName, iconColor }) => {
  if (iconWrap) {
    return (
      <span className="badge badge-light">
        <i style={{ color: iconColor }} className={iconName} />
      </span>
    );
  }

  return <i style={{ color: iconColor }} className={iconName} />;
};

TabIcon.propTypes = {
  iconWrap: PropTypes.bool,
  iconColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
};

TabIcon.defaultProps = {
  iconWrap: false,
  iconColor: '#fff',
};

export default TabIcon;
