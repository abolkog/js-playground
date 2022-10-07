import Clickable from 'components/Clickable';

const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onClose,
  onClick,
}) => {
  if (!position) return null;

  return (
    <ul
      data-testid="app-context-menu"
      className="menu"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <li>
        <Clickable onClick={onClick}>View JSON</Clickable>
      </li>
      <li>
        <Clickable onClick={onClose}>Close</Clickable>
      </li>
    </ul>
  );
};

export default ContextMenu;
