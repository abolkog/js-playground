import { render, screen } from '@testing-library/react';
import Console from 'components/Console';
import { AppContext } from 'context/AppContext';

describe('<Console />', () => {
  let state = {} as AppState;
  const dispatch = jest.fn();

  afterEach(() => {
    state = {
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
      </AppContext.Provider>,
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
      </AppContext.Provider>,
    );

    expect(screen.queryByTestId('console-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('console-result').children.length).toEqual(
      result.length,
    );
  });

  it('stringify result that is not a string', () => {
    const result = [{ message: 'result' }, 'item'];
    state.result = result;
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <Console />
      </AppContext.Provider>,
    );

    expect(screen.getByTestId('console-result-item-0').textContent).toEqual(
      JSON.stringify(result[0], null, 0),
    );
    expect(screen.getByTestId('console-result-item-1').textContent).toEqual(
      JSON.stringify(result[1], null, 0),
    );
  });

  it('add indentation when result is large', () => {
    const largeObj = {
      a: 'This is a long string to make the object large enough for pretty print.',
      b: Array(10).fill('more data'),
      c: { nested: true, arr: [1, 2, 3, 4, 5] },
    };
    state.result = [largeObj];
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <Console />
      </AppContext.Provider>,
    );

    // The component should pretty-print with 2 spaces for large objects
    expect(screen.getByTestId('console-result-item-0').textContent).toEqual(
      JSON.stringify(largeObj, null, 3),
    );
  });
});
