import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import CodeMirror from "react-codemirror";
import "../../node_modules/codemirror/mode/jsx/jsx";

import { handleCode } from "../actions";

class Editor extends Component {
  onCodeChanged(code) {
    const { handleCode } = this.props;
    handleCode(code);
  }

  render() {
    const editorOptions = {
      mode: "jsx",
      lineNumbers: true,
      lineWrapping: true,
      theme: "material"
    };
    return (
      <div style={{ height: "100%" }}>
        <CodeMirror
          onChange={code => this.onCodeChanged(code)}
          options={editorOptions}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  handleCode: PropTypes.func.isRequired
};

export default connect(
  null,
  { handleCode }
)(Editor);
