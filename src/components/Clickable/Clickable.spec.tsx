import { fireEvent, render, screen } from '@testing-library/react';
import Clickable from 'components/Clickable';

describe('<Clickable />', () => {
  it('invoke on click when button clicked', () => {
    const onClick = jest.fn();
    render(<Clickable onClick={onClick} />);
    fireEvent.click(screen.getByTestId('app-clickable'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
