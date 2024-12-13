import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import JsonView from 'components/JsonView';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';

describe('<JsonView />', () => {
  const state = {
    display: 'block',
    result: [''],
  } as AppState;
  const dispatch = jest.fn();

  beforeEach(() => {
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <JsonView />
      </AppContext.Provider>,
    );
  });

  afterEach(cleanup);

  it('calls dispatch on button click', () => {
    fireEvent.click(screen.getByTestId('modal-close-btn'));

    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_JSON_VIEW,
      payload: 'none',
    });
  });
});
