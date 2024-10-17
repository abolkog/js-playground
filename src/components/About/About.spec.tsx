import { fireEvent, render, screen } from '@testing-library/react';
import { LIBRARIES } from 'helpers/const';
import About from 'components/About';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

describe('<About />', () => {
  const state = {
    display: 'block',
  } as AppState;
  const dispatch = jest.fn();

  beforeEach(() => {
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <About />
      </AppContext.Provider>
    );
  });

  it('render libraries list', () => {
    const listElement = screen.getByTestId('about-libraries-list');
    expect(listElement.children.length).toEqual(LIBRARIES.length);
  });

  it('calls dipatch on button click', () => {
    fireEvent.click(screen.getByTestId('modal-close-btn'));

    expect(dispatch).toHaveBeenCalledWith({
      type: AppAactions.TOGGLE_ABOUT_MODAL,
      payload: 'none',
    });
  });
});
