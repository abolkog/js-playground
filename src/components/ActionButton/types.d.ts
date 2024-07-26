type ActionButtonType = 'execute' | 'clear';

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
