import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { connect } from 'react-redux';
import { codeActions } from '../../store/actions';
import { commonTypes } from '../../store/types';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.runCode = this.runCode.bind(this);
  }

  componentDidMount() {
    const { theme, code = '' } = this.props;
    const editorConfig = {
      value: null,
      language: 'javascript',
      fontSize: 20,
      theme,
      minimap: {
        enabled: false,
      },
    };

    this.editor = monaco.editor.create(this.editorRef.current, editorConfig);
    monaco.editor.setModelLanguage(this.editor.getModel(), 'javascript');
    this.editor.layout();
    this.editor.addAction({
      id: 'run-code',
      label: 'Run The Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: this.runCode,
    });
    this.editor.addAction({
      id: 'clear-code',
      label: 'Clear The Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_L],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => {
        const { dispatch } = this.props;
        dispatch({ type: commonTypes.CLEAR_HISTORY });
      },
    });

    this.editor.setValue(code);
    this.editorIsReady(this.editor);
  }

  componentDidUpdate(prevProps) {
    const { theme, sample, code } = this.props;
    if (prevProps.theme !== theme) {
      monaco.editor.setTheme(theme);
    }
    if (prevProps.sample !== sample) {
      this.editor.setValue(sample);
    }

    if (prevProps.code && !code) {
      this.editor.setValue('');
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  editorIsReady(editor) {
    const { dispatch } = this.props;
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      dispatch(codeActions.updateCode(code));
    });
  }

  runCode() {
    const { code, dispatch } = this.props;
    dispatch(codeActions.executeCode(code));
  }

  render() {
    return <div ref={this.editorRef} style={{ width: '100%', height: '100%' }} />;
  }
}

CodeEditor.propTypes = {
  theme: PropTypes.string,
  code: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
};

CodeEditor.defaultProps = {
  theme: 'vs-dark',
};

const mapStateToProps = ({ code }) => {
  return {
    theme: code.theme,
    sample: code.sample,
    code: code.code,
  };
};
export default connect(mapStateToProps)(CodeEditor);
