import { act, render, screen, fireEvent } from '@testing-library/react';
import { LIBRARIES } from 'helpers/const';
import About from 'components/About';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';

describe('<About />', () => {
  const state = {
    aboutModalOpen: true,
  } as AppState;
  const dispatch = jest.fn();

  beforeEach(async () => {
    await act(async () => {
      render(
        <AppContext.Provider value={{ state, dispatch }}>
          <About />
        </AppContext.Provider>,
      );
    });
  });

  it('render libraries list', () => {
    const listElement = screen.getByTestId('about-libraries-list');
    expect(listElement.children.length).toEqual(LIBRARIES.length);
  });

  it('closes the modal', () => {
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.HIDE_ABOUT_MODAL,
    });
  });
});
