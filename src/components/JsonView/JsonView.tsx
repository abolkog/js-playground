import { useContext } from 'react';
import ReactJsonView from 'react-json-view';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import Modal from 'components/Modal';

const JsonView: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const open = state.jsonView !== 'none';

  const handleClose = () => {
    dispatch({ type: AppActions.TOGGLE_JSON_VIEW, payload: 'none' });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} title="JSON View">
      <ReactJsonView
        src={state.result.filter(item => item)}
        theme="monokai"
        name={false}
      />
    </Modal>
  );
};

export default JsonView;
