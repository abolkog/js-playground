import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleModal } from "../actions";

class About extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const { display } = this.props;
    return (
      <div>
        <div className="modal fade show" style={{ display }}>
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
                <p>
                  You can play around with JavaScript code here, also this
                  sandbox playground is hooked up diretly with{" "}
                  <a
                    href="https://redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Redux
                  </a>
                </p>
                <p>Enjoy</p>
                <a
                  href="https://abolkog.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Khalid Elshafie
                </a>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.close}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  display: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ code }) => ({ display: code.display });
export default connect(
  mapStateToProps,
  { toggleModal }
)(About);
