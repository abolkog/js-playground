import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';

import { handleCode } from '../actions';

class Editor extends Component {
  _onCodeChanged(code) {
    console.clear();
    this.props.handleCode(code);
  }

  render() {
    const editorOptions = {
      mode: 'jsx',
      lineNumbers: true,
      lineWrapping: true,
      theme: 'material'
    };
    return (
      <div style={{ height: '100%' }}>
        <CodeMirror
          onChange={this._onCodeChanged.bind(this)}
          options={editorOptions}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { handleCode }
)(Editor);
