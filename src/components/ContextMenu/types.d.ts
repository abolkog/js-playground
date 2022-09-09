interface MenuPosition {
  top: number;
  left: number;
}
interface ContextMenuProps {
  position: MenuPosition | null;
  onClose: VoidFunction;
  onClick: VoidFunction;
}
