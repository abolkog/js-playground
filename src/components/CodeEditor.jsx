import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { connect } from 'react-redux';
import { updateCode } from '../actions';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const editorConfig = {
      value: null,
      language: 'javascript',
      fontSize: 20,
      theme: 'vs-dark',
      minimap: {
        enabled: false
      }
    };

    this.editor = monaco.editor.create(this.editorRef.current, editorConfig);
    monaco.editor.setModelLanguage(this.editor.getModel(), 'javascript');
    this.editor.layout();
    this.editorIsReady(this.editor);
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  editorIsReady(editor) {
    const { updateCode } = this.props;
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      updateCode(code);
    });
  }

  render() {
    return (
      <div ref={this.editorRef} style={{ width: '100%', height: '100%' }} />
    );
  }
}
CodeEditor.propTypes = {
  updateCode: PropTypes.func.isRequired
};
export default connect(null, { updateCode })(CodeEditor);
