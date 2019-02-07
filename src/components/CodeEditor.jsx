import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as CodeMirror from 'codemirror';
import '../../node_modules/codemirror/mode/jsx/jsx';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material.css';
import '../../node_modules/codemirror/addon/hint/show-hint';
import '../../node_modules/codemirror/addon/hint/show-hint.css';
import '../../node_modules/codemirror/addon/hint/javascript-hint';

import { connect } from 'react-redux';
import { updateCode } from '../actions';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const editorOptions = {
      mode: 'jsx',
      lineNumbers: true,
      lineWrapping: true,
      styleActiveLine: true,

      theme: 'material',
      extraKeys: { 'Ctrl-Space': 'autocomplete' }
    };
    this.editor = CodeMirror.fromTextArea(
      this.editorRef.current,
      editorOptions
    );
    this.editor.on('change', this.onChange);
  }

  onChange(code) {
    const { updateCode } = this.props;
    updateCode(code.getValue());
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <textarea ref={this.editorRef} defaultValue="//Write code here" />
      </div>
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
