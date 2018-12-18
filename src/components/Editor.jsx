import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/jsx/jsx';

import { codeChanged } from '../actions';


class Editor extends Component {

    _onCodeChanged(code) {
        console.clear(); //Clear the console
        this.props.codeChanged(code);
    }
    render() {
        const editorOptions = {
            mode: 'jsx',
            lineNumbers: true,
            lineWrapping: true,
            theme: 'material'

        }
        return(
            <div className='editorContainer'>
                <CodeMirror 
                    onChange={this._onCodeChanged.bind(this)}
                    options={editorOptions} />
            </div>
        );
    }
}

const mapStateToProps = ({ code }) => {
    return { code };
}

export default connect(mapStateToProps, { codeChanged })(Editor);