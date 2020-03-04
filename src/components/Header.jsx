import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../actions';
import RunButton from './RunButton';
import ClearButton from './ClearButton';

const Header = ({ toggleModal }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      JS PlayGround
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
            onClick={() => toggleModal()}
          >
            About
          </button>
        </li>
      </ul>
      <div className="my-2">
        <ClearButton />
        <span style={{ marginLeft: 20, marginRight: 20 }} />
        <RunButton />
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired
};
export default connect(null, { toggleModal })(Header);
