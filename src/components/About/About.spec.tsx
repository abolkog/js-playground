import { fireEvent, render, screen } from '@testing-library/react';
import { LIBRARIES } from 'helpers/const';
import About from 'components/About';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

describe('<About />', () => {
  it('render libraries list', () => {
    render(<About />);
    const listElement = screen.getByTestId('about-libraries-list');
    expect(listElement.children.length).toEqual(LIBRARIES.length);
  });

  it('calls dipatch on button click', () => {
    const state = {
      display: 'block',
    } as AppState;
    const dispatch = jest.fn();

    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <AppContext.Provider value={{ state, dispatch }}>
        <About />
      </AppContext.Provider>
    );
    fireEvent.click(screen.getByText(/close/i));

    expect(dispatch).toHaveBeenCalledWith({
      type: AppAactions.TOGGLE_ABOUT_MODAL,
      payload: 'none',
    });
  });
});
