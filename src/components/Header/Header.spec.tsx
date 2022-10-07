import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Header from 'components/Header';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

describe('<Header />', () => {
  describe('header actions', () => {
    const state = { codeSample: '', codeSampleName: '' } as AppState;
    let dispatch: any;
    beforeEach(() => {
      dispatch = jest.fn();
      render(
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <AppContext.Provider value={{ state, dispatch }}>
          <Header />
        </AppContext.Provider>
      );
    });

    afterEach(() => {
      cleanup();
    });

    it('dispatch about action when about button is click', () => {
      fireEvent.click(screen.getByText('About'));
      expect(dispatch).toHaveBeenCalledWith({
        payload: 'block',
        type: AppAactions.TOGGLE_ABOUT_MODAL,
      });
    });
    it('toggle the theme when toggle button is click', () => {
      fireEvent.click(screen.getByTestId('app-theme-button-vs-dark'));
      expect(dispatch).toHaveBeenCalledWith({
        payload: 'vs-dark',
        type: AppAactions.TOGGLE_THEME,
      });
    });

    it('dispatch execute code action when run button is clicked', () => {
      fireEvent.click(screen.getByTestId('actionbutton-button-execute'));
      expect(dispatch).toHaveBeenCalledWith({
        type: AppAactions.CODE_RUNNING,
      });
    });

    it('dispatch clear result action when clear button is clicked', () => {
      fireEvent.click(screen.getByTestId('actionbutton-button-clear'));
      expect(dispatch).toHaveBeenCalledWith({
        type: AppAactions.CLEAR_RESULT,
      });
    });

    it('dispatch reset action when reset button is clicked', () => {
      jest.spyOn(global, 'confirm' as any).mockReturnValueOnce(true);
      fireEvent.click(screen.getByTestId('actionbutton-button-reset'));
      expect(dispatch).toHaveBeenCalledWith({
        type: AppAactions.RESET_ALL,
      });
    });

    it('dispatch load code sample on sample change', () => {
      fireEvent.change(screen.getByTestId('header-code-selector'), {
        target: { value: 'Axios' },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: AppAactions.LOAD_CODE_SAMPLE,
        payload: expect.objectContaining({
          codeSampleName: 'Axios',
        }),
      });
    });
  });
});
