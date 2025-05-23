import { act, render, screen } from '@testing-library/react';
import { LIBRARIES } from 'helpers/const';
import About from 'components/About';
import { AppContext } from 'context/AppContext';

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
});
