import { useContext } from 'react';
import { LIBRARIES } from 'helpers/const';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

const About: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <div
        data-testid="about-main-container"
        className="modal fade show"
        style={{ display: state.display }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">About JS Playground</h4>
            </div>
            <div className="modal-body">
              <p>
                JS Playground is an experimental JavaScript PlayGround created
                for Education and Testing Purposes
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
                        <a
                          href={lib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {lib.name}{' '}
                          <span className="text-sm">v{lib.version}</span>
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
                  <a
                    href="https://nyala.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Khalid Elshafie
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  dispatch({
                    type: AppAactions.TOGGLE_ABOUT_MODAL,
                    payload: 'none',
                  })
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
