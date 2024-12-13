import { useContext } from 'react';
import ReactJsonView from '@uiw/react-json-view';

import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { nordTheme } from '@uiw/react-json-view/nord';

import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import Modal from 'components/Modal';

const JsonView: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const open = state.jsonView !== 'none';
  const theme = state.theme === 'vs-light' ? githubLightTheme : nordTheme;

  const handleClose = () => {
    dispatch({ type: AppActions.TOGGLE_JSON_VIEW, payload: 'none' });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} title="JSON View">
      <ReactJsonView value={state.result.filter(item => item)} style={theme} />
    </Modal>
  );
};

export default JsonView;
