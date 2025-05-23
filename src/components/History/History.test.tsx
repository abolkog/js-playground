import React from 'react';
import { fireEvent, act, render, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import History from 'components/History';
import * as StorageService from 'services/storage';

const getHistorySpy = jest.spyOn(StorageService, 'getHistory');
const mockHistory = [
  {
    date: 'second',
    code: 'const a = 10',
  },
  {
    date: 'first',
    code: 'const b = 20',
  },
];

describe('<History />', () => {
  const state = {
    historyOpen: true,
  } as AppState;
  const dispatch = jest.fn();

  beforeEach(async () => {
    getHistorySpy.mockReturnValue([...mockHistory]);
    await act(async () => {
      render(
        <AppContext.Provider value={{ state, dispatch }}>
          <History />
        </AppContext.Provider>,
      );
    });
  });

  afterEach(jest.clearAllMocks);

  it('render history list', () => {
    const historyElement = screen.getByTestId('history-container');
    expect(historyElement.children.length).toEqual(2);
  });

  it('calls closes the modal on button click', () => {
    const closeButton = screen.getByTestId('history-close-btn');
    fireEvent.click(closeButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.HIDE_HISTORY,
    });
  });

  it('restores history when restore button is clicked', async () => {
    // Expand
    const disclosureButtons = await screen.findAllByRole('button');
    for (const btn of disclosureButtons) {
      if (btn.textContent !== 'Restore') {
        await act(async () => {
          fireEvent.click(btn);
        });
      }
    }

    const restoreButtons = await screen.findAllByRole('button', {
      name: /Restore/,
    });
    await act(async () => {
      fireEvent.click(restoreButtons[0]);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.LOAD_CODE_SAMPLE,
      payload: {
        codeSample: mockHistory[1].code,
        codeSampleName: '',
      },
    });
  });
});
