import { act, fireEvent, render, screen } from '@testing-library/react';
import ShareCode from 'components/ShareCode';
import { AppContext } from 'context/AppContext';

describe('<ShareCode />', () => {
  const state = {
    shareUrl: 'https://abolkog.github.io/js-playground/?code=sample',
  } as AppState;
  const dispatch = jest.fn();

  beforeEach(jest.clearAllMocks);

  it('it render share code modal', async () => {
    await act(async () => {
      render(
        <AppContext.Provider value={{ state, dispatch }}>
          <ShareCode />
        </AppContext.Provider>,
      );
    });
    const shareTextBox = screen.getByRole('textbox');
    expect(shareTextBox).toBeInTheDocument();
    expect(shareTextBox).toHaveValue(state.shareUrl);
  });

  it('it copy url to clip board on button click', async () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });
    const clipboardWriteText = jest.spyOn(navigator.clipboard, 'writeText');

    await act(async () => {
      render(
        <AppContext.Provider value={{ state, dispatch }}>
          <ShareCode />
        </AppContext.Provider>,
      );
    });
    const shareButton = screen.getByRole('button');
    fireEvent.click(shareButton);
    expect(clipboardWriteText).toHaveBeenCalledWith(state.shareUrl);
  });

  it('it does not render share modal when no url', async () => {
    await act(async () => {
      render(
        <AppContext.Provider
          value={{ state: { ...state, shareUrl: '' }, dispatch }}
        >
          <ShareCode />
        </AppContext.Provider>,
      );
    });
    const shareTextBox = screen.queryByRole('textbox');
    expect(shareTextBox).not.toBeInTheDocument();
  });
});
