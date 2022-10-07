import TabIcon from 'components/TabIcon';
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';

const lightStyle = { background: '#fff', color: '#000' };

const Tab: React.FC<TabProps> = ({ tab }) => {
  const { state } = useContext(AppContext);
  const extraStyle = state.theme === 'vs-light' ? lightStyle : {};

  const { title, iconName, iconColor, iconWrap, component: TabComponent } = tab;

  return (
    <div style={{ height: '100%' }}>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <span className="nav-link active" data-toggle="tab">
            <TabIcon
              iconWrap={iconWrap}
              iconName={iconName}
              iconColor={iconColor}
            />
            <span data-testid="tab-title" style={{ marginLeft: 5 }}>
              {title}
            </span>
          </span>
        </li>
      </ul>
      <div
        data-testid="tab-component-wrapper"
        className="tab-pane fade show active"
        style={{ height: '94%', ...extraStyle }}
      >
        <div style={{ height: '100%' }}>
          <TabComponent />
        </div>
      </div>
    </div>
  );
};

export default Tab;
