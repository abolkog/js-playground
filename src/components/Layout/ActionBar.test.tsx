import { fireEvent, render, screen } from '@testing-library/react';
import ActionBar from './ActionBar';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';

describe('<ActionBar />', () => {
  const dispatch = jest.fn();
  const state = {
    code: 'console.log("hello")',
    loading: false,
    result: [],
    error: '',
    sidebarOpen: false,
    historyOpen: false,
    aboutModalOpen: false,
    shareUrl: '',
    codeSample: '',
    codeSampleName: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderComponent(customState = {}) {
    render(
      <AppContext.Provider
        value={{ state: { ...state, ...customState }, dispatch }}
      >
        <ActionBar />
      </AppContext.Provider>,
    );
  }

  it('renders all main action buttons', () => {
    renderComponent();
    expect(screen.getByText('Run Code')).toBeInTheDocument();
    expect(screen.getByText('Clear Console')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Code Samples')).toBeInTheDocument();
    expect(screen.getByText('Share Code')).toBeInTheDocument();
    expect(screen.getByText('About JS Playground')).toBeInTheDocument();
  });

  it('calls runCode when "Run Code" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Run Code'));
    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.CODE_RUNNING,
    });
  });

  it('dispatches CLEAR_RESULT when "Clear Console" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Clear Console'));
    expect(dispatch).toHaveBeenCalledWith({ type: AppActions.CLEAR_RESULT });
  });

  it('dispatches SHOW_HISTORY when "History" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('History'));
    expect(dispatch).toHaveBeenCalledWith({ type: AppActions.SHOW_HISTORY });
  });

  it('dispatches SET_SHARE_URL when "Share Code" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Share Code'));
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: AppActions.SET_SHARE_URL }),
    );

    const call = dispatch.mock.calls.find(
      ([arg]) => arg.type === AppActions.SET_SHARE_URL,
    );
    expect(call[0].payload).toContain('code=');
  });

  it('dispatches SHOW_ABOUT_MODAL when "About JS Playground" is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('About JS Playground'));
    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.SHOW_ABOUT_MODAL,
    });
  });
});
