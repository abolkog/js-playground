import React, { Component } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { connect } from 'react-redux';
import { handleCode } from '../actions';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.editorContainer = React.createRef();
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainer.current, {
      language: 'javascript',
      theme: 'vs-dark',
      fontSize: 16,
      contextmenu: false,
      minimap: {
        enabled: false
      }
    });

    this.editorIsReady();
  }

  editorIsReady() {
    const { handleCode } = this.props;
    this.editor.onDidChangeModelContent(e => {
      const code = this.editor.getValue();
      handleCode(code);
    });
  }
  render() {
    return <div ref={this.editorContainer} style={{ height: '100%' }} />;
  }
}

export default connect(
  null,
  { handleCode }
)(CodeEditor);
