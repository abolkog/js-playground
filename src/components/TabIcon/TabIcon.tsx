const TabIcon: React.FC<TabIconProps> = ({
  iconName,
  iconColor = '#FFF',
  iconWrap = false,
}) => {
  const renderIcon = () => (
    <i
      data-testid="app-tab-icon"
      style={{ color: iconColor }}
      className={iconName}
    />
  );

  if (iconWrap) {
    return (
      <span data-testid="app-tab-icon-wrap" className="badge badge-light">
        {renderIcon()}
      </span>
    );
  }

  return renderIcon();
};

export default TabIcon;
