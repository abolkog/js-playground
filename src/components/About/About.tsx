import { useContext } from 'react';
import { LIBRARIES } from 'helpers/const';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import Modal from 'components/Modal';

const About: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const open = state.display !== 'none';

  const handleClose = () => {
    dispatch({ type: AppActions.TOGGLE_ABOUT_MODAL, payload: 'none' });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} title="About JS Playground">
      <p>
        JS Playground is an experimental JavaScript PlayGround created for
        Education and Testing Purposes
      </p>
      <div>
        This sandbox playground is hooked up directly with
        <ul data-testid="about-libraries-list">
          {LIBRARIES.map(lib => (
            <li key={lib.name}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <a href={lib.url} target="_blank" rel="noopener noreferrer">
                  {lib.name} <span className="text-sm">v{lib.version}</span>
                </a>
                <span>Use as {lib.use}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p>Enjoy</p>
      <div>
        <div className="float-left">
          <a href="https://nyala.dev" target="_blank" rel="noopener noreferrer">
            Khalid Elshafie
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default About;
