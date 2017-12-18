import React, { Component } from 'react';

import Editor from './Editor';
import Console from './Console';

import '../styles/App.css';

class App extends Component {
    render(){
        return (
            <div>
                <Editor />
                <Console />
            </div>
        );
    }
}
export default App;