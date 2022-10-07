import { ChangeEvent, useContext } from 'react';
import ActionButton from 'components/ActionButton';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';
import { CODE_SAMPLES, EDITOR_THEMES } from 'helpers/const';
import useCodeRunner from 'hooks/useCodeRunner';

const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { runCode } = useCodeRunner();
  const { theme, codeSampleName } = state;

  const handleReset = () => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm('This will clear history and code. Are you sure?');
    if (answer) {
      dispatch({ type: AppAactions.RESET_ALL });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    const { codeSample } = CODE_SAMPLES.find(item => item.name === value)!;

    const payload = {
      codeSample,
      codeSampleName: value,
    };

    dispatch({ type: AppAactions.LOAD_CODE_SAMPLE, payload });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        JS PlayGround
      </a>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                dispatch({
                  type: AppAactions.TOGGLE_ABOUT_MODAL,
                  payload: 'block',
                })
              }
            >
              About
            </button>
          </li>
        </ul>
        <div className="my-2 app-actions">
          <div>
            <select
              data-testid="header-code-selector"
              className="form-control"
              value={codeSampleName}
              onChange={handleChange}
            >
              <option value="" disabled>
                Load Sample Code
              </option>
              {CODE_SAMPLES.map(item => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <span style={{ marginLeft: 20, marginRight: 20 }} />

          <div className="btn-group" role="group">
            {EDITOR_THEMES.map(item => (
              <button
                key={item.id}
                type="button"
                data-testid={`app-theme-button-${item.value}`}
                className={`btn btn-${
                  theme === item.value ? 'warning' : ' default'
                }`}
                onClick={() => {
                  dispatch({
                    type: AppAactions.TOGGLE_THEME,
                    payload: item.value,
                  });
                }}
              >
                <i className={`fas fa-${item.icon}`} />
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton type="reset" onClick={handleReset} />

          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton
            type="clear"
            onClick={() => dispatch({ type: AppAactions.CLEAR_RESULT })}
          />

          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ActionButton
            type="execute"
            onClick={() => runCode(state.code)}
            loading={state.loading}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
