import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { commonActions, codeActions } from '../../store/actions';
import RunButton from '../RunButton';
import ClearButton from '../ClearButton';
import THEMES from './util';
import CodeSamples from './code-sample.json';

const Header = ({ dispatch, sampleName, activeTheme }) => {
  const handleChange = e => {
    e.preventDefault();
    const {
      target: { value }
    } = e;

    const { code = '' } = CodeSamples.filter(item => item.name === value).reduce(item => item);
    dispatch(codeActions.loadCodeSample(value, code));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        JS PlayGround <span className="small-text">V{process.env.APP_VERSION}</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(commonActions.toggleModal())}
            >
              About
            </button>
          </li>
        </ul>
        <div className="my-2 app-actions">
          <div>
            <select className="form-control" value={sampleName} onChange={handleChange}>
              <option value="" disabled>
                Load Sample Code
              </option>
              {CodeSamples.map(item => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <span style={{ marginLeft: 20, marginRight: 20 }} />

          <div className="btn-group" role="group">
            {THEMES.map(item => (
              <button
                key={item.id}
                type="button"
                className={`btn btn-${activeTheme === item.value ? 'warning' : ' default'}`}
                onClick={() => dispatch(codeActions.updateEditorTheme(item.value))}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <ClearButton />
          <span style={{ marginLeft: 20, marginRight: 20 }} />
          <RunButton />
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  activeTheme: PropTypes.string.isRequired,
  sampleName: PropTypes.string.isRequired
};

const mapStateToProps = ({ code }) => {
  return {
    activeTheme: code.theme,
    sampleName: code.sampleName
  };
};
export default connect(mapStateToProps)(Header);
