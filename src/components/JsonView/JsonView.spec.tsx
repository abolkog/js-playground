import { fireEvent, render, screen } from '@testing-library/react';
import JsonView from 'components/JsonView';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

describe('<JsonView />', () => {
  it('calls dipatch on button click', () => {
    const state = {
      display: 'block',
      result: [''],
    } as AppState;
    const dispatch = jest.fn();

    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <AppContext.Provider value={{ state, dispatch }}>
        <JsonView />
      </AppContext.Provider>
    );
    fireEvent.click(screen.getByText(/close/i));

    expect(dispatch).toHaveBeenCalledWith({
      type: AppAactions.TOGGLE_JSON_VIEW,
      payload: 'none',
    });
  });
});
