import React, { Component } from 'react';

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/jsx/jsx';


class Editor extends Component {
    render() {
        const editorOptions = {
            mode: 'jsx',
            lineNumbers: true,
            theme: 'material'
        }
        return(
            <div className='editorContainer'>
                <CodeMirror options={editorOptions} />
            </div>
        );
    }
}

export default Editor;
