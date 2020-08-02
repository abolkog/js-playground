import React from 'react';
import PropTypes from 'prop-types';
import TabIcon from '../TabIcon';

const Tab = ({ tabs }) => {
  return (
    <div style={{ height: '100%' }}>
      <ul className="nav nav-tabs">
        {tabs.map(tab => {
          const { title, iconName, iconColor, iconWrap } = tab;
          return (
            <li key={tab.id} className="nav-item">
              <span className="nav-link active" data-toggle="tab">
                <TabIcon iconWrap={iconWrap} iconName={iconName} iconColor={iconColor} />
                <span style={{ marginLeft: 5 }}>{title}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="tab-pane fade show active" style={{ height: '94%' }}>
        <div style={{ height: '100%' }}>
          {tabs.map(tab => {
            const { component: TabComponent, componentProps } = tab;
            return <TabComponent key={tab.id} {...componentProps} />;
          })}
        </div>
      </div>
    </div>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tab;
