import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import { updateCode } from '../actions';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(code) {
    const { updateCode } = this.props;
    updateCode(code);
  }

  render() {
    const editorOptions = {
      fontSize: 16,
      contextmenu: false,
      minimap: {
        enabled: false
      }
    };
    return (
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={editorOptions}
        onChange={this.onChange}
        editorDidMount={editor => editor.focus()}
      />
    );
  }
}
CodeEditor.propTypes = {
  updateCode: PropTypes.func.isRequired
};
export default connect(
  null,
  { updateCode }
)(CodeEditor);
