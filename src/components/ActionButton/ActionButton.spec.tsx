import { fireEvent, render, screen } from '@testing-library/react';
import ActionButton from 'components/ActionButton';

const buttonTestId = 'actionbutton-button';
const iconTestId = 'actionbutton-icon';
describe('<ActionButton />', () => {
  const onClick = jest.fn();

  it('render clear button when button type is clear', () => {
    render(<ActionButton onClick={onClick} type="clear" />);
    const button = screen.getByTestId(`${buttonTestId}-clear`);
    const icon = screen.getByTestId(iconTestId);

    expect(button.textContent?.trim()).toEqual('Clear result');
    expect(button).toHaveClass('btn-info');
    expect(icon).toHaveClass('fa-trash');
  });

  it('render execute button when button type is execute', () => {
    render(<ActionButton onClick={onClick} type="execute" />);
    const button = screen.getByTestId(`${buttonTestId}-execute`);
    const icon = screen.getByTestId(iconTestId);

    expect(button.textContent?.trim()).toEqual('Run');
    expect(button).toHaveClass('btn-success');
    expect(icon).toHaveClass('fa-play-circle');
  });

  it('render loading icon when loading prop is truthy', () => {
    render(<ActionButton onClick={onClick} type="execute" loading />);
    const icon = screen.getByTestId(iconTestId);
    expect(icon).toHaveClass('fas fa-spinner fa-spin');
  });

  it('invoke onClick when button is clicked', () => {
    render(<ActionButton onClick={onClick} type="execute" />);
    const button = screen.getByTestId(`${buttonTestId}-execute`);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
