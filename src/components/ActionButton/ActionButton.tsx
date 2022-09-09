const ButtonProps: Record<ActionButtonType, ActionButtonTypeProps> = {
  reset: {
    title: 'Reset',
    className: 'btn btn-danger',
    icon: 'fas fa-redo',
    toolTip: 'Clear code in editor and result',
  },
  clear: {
    title: 'Clear',
    icon: 'fas fa-trash',
    className: 'btn btn-info',
    toolTip: 'Clear result (CtrCmd + l)',
  },
  execute: {
    title: 'Run',
    icon: 'fas fa-play-circle',
    className: 'btn btn-success',
    toolTip: 'Run Code (CtrCmd + k)',
  },
};

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  loading = false,
}) => {
  const buttonProps = ButtonProps[type];
  const iconName = loading ? 'fas fa-spinner fa-spin' : buttonProps.icon;
  return (
    <button
      data-toggle="tooltip"
      data-testid={`actionbutton-button-${type}`}
      type="button"
      onClick={onClick}
      className={buttonProps.className}
      disabled={loading}
      title={buttonProps.toolTip}
    >
      <span>{buttonProps.title}</span>
      &nbsp;
      <i data-testid="actionbutton-icon" className={iconName} />
    </button>
  );
};

export default ActionButton;
