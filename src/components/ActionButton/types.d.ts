type ActionButtonType = 'execute' | 'reset' | 'clear';

interface ActionButtonProps {
  type: ActionButtonType;
  onClick: VoidFunction;
  loading?: boolean;
}

interface ActionButtonTypeProps {
  title: string;
  icon: string;
  className: string;
  toolTip?: string;
}
