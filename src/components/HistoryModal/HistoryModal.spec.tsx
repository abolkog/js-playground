import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import HistoryModal from 'components/HistoryModal';
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

describe('<HistoryModal />', () => {
  const state = {
    historyModalShown: true,
  } as AppState;
  const mockSetState = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    getHistorySpy.mockReturnValue(mockHistory);
    jest.spyOn(React, 'useState').mockReturnValue([0, mockSetState]);
    render(
      <AppContext.Provider value={{ state, dispatch }}>
        <HistoryModal />
      </AppContext.Provider>
    );
  });

  afterEach(jest.clearAllMocks);

  it('render history list', () => {
    const historyElement = screen.getByTestId('history-accordion');
    expect(historyElement.children.length).toEqual(2);
  });

  it('calls closes the modal on button click', () => {
    fireEvent.click(screen.getByTestId('modal-close-btn'));

    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_HISTORY_MODAL,
    });
  });

  describe('when restoring history', () => {
    const historyItemIndex = 0;
    beforeEach(async () => {
      const restoreButtons = await screen.findAllByRole('button', {
        name: /Restore/,
      });
      fireEvent.click(restoreButtons[historyItemIndex]);
    });

    it('restore history when restore button click', () => {
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: AppActions.LOAD_CODE_SAMPLE,
        payload: {
          codeSample: mockHistory[historyItemIndex].code,
          codeSampleName: '',
        },
      });
    });

    it('dismiss the modal', () => {
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: AppActions.TOGGLE_HISTORY_MODAL,
      });
    });
  });
});
