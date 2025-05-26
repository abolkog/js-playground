import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('renders the svg element', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('svg.text-gray-300.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
