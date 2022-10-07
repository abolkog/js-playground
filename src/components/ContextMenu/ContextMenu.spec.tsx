import { render, screen } from '@testing-library/react';
import ContextMenu from 'components/ContextMenu';

describe('<ContextMenu/>', () => {
  const props: ContextMenuProps = {
    position: { left: 1, top: 1 },
    onClick: jest.fn(),
    onClose: jest.fn(),
  };
  it('does not render if poistion is not defined', () => {
    render(<ContextMenu {...props} position={null} />);
    expect(screen.queryByTestId('app-context-menu')).not.toBeInTheDocument();
  });

  it('render context menu when position is defined', () => {
    render(<ContextMenu {...props} />);
    const menuItem = screen.queryByTestId('app-context-menu');
    expect(menuItem).toBeInTheDocument();
  });
});
