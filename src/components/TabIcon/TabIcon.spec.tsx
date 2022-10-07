import { render, screen } from '@testing-library/react';
import TabIcon from 'components/TabIcon';

describe('<TabIcon />', () => {
  const iconName = 'fab fa-js-square';

  it('wrap icon in span when iconWrap prop is true', () => {
    render(<TabIcon iconName={iconName} iconWrap />);
    expect(screen.queryByTestId('app-tab-icon-wrap')).toBeInTheDocument();
  });

  it('does not wrap icon in span when iconWrap prop is false', () => {
    render(<TabIcon iconName={iconName} />);
    expect(screen.queryByTestId('app-tab-icon-wrap')).not.toBeInTheDocument();
  });

  it('render correct icon', () => {
    render(<TabIcon iconName={iconName} />);
    const iconElement = screen.getByTestId('app-tab-icon');
    expect(iconElement).toHaveClass(iconName);
  });
});
