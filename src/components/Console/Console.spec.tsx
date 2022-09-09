/* eslint-disable react/jsx-no-constructed-context-values */
import { render, screen } from '@testing-library/react';
import Console from 'components/Console';
import { AppContext } from 'context/AppContext';

describe('<Console />', () => {
  let state = {} as AppState;
  const dispatch = jest.fn();

  afterEach(() => {
    state = {
      display: 'block',
      error: '',
      result: [''],
    } as AppState;
  });

  it('display code execution error', () => {
    const errorMessage = 'invalid code';
    state.error = errorMessage;
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <Console />
      </AppContext.Provider>
    );

    const errorDiv = screen.getByTestId('console-error');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv.textContent).toEqual(errorMessage);
  });

  it('display code execution result', () => {
    const result = ['Code Result', 'Console Result'];
    state.result = result;
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <Console />
      </AppContext.Provider>
    );

    expect(screen.queryByTestId('console-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('console-result').children.length).toEqual(
      result.length
    );
  });

  it('stringfy result that is not a string', () => {
    const result = [{ message: 'result' }, 'item'];
    state.result = result;
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <Console />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('console-result-item-0').textContent).toEqual(
      JSON.stringify(result[0])
    );
    expect(screen.getByTestId('console-result-item-1').textContent).toEqual(
      result[1]
    );
  });
});
