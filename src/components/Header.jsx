import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleModal } from "../actions";

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
          <span
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => toggleModal()}
          >
            About
          </span>
        </li>
      </ul>
    </div>
  </nav>
);

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired
};
export default connect(
  null,
  { toggleModal }
)(Header);
