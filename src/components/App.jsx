import React, { Component } from 'react';

import Editor from './Editor';
import Console from './Console';

import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 900
    };

    this._initResize = this._initResize.bind(this);
    this._startResize = this._startResize.bind(this);
    this._stopResize = this._stopResize.bind(this);
  }

  componentDidMount() {
    this._resizer.addEventListener('mousedown', this._initResize, false);
  }

  componentWillUnmount() {
    this._stopResize();
  }

  _initResize() {
    window.addEventListener('mousemove', this._startResize, false);
    window.addEventListener('mouseup', this._stopResize, false);
  }
  _startResize(e) {
    const width = e.clientX;
    this.setState({ width });
  }

  _stopResize() {
    window.removeEventListener('mousemove', this._startResize, false);
    window.removeEventListener('mouseup', this._stopResize, false);
  }

  render() {
    return (
      <div className='appConainer'>
        <div style={{ width: this.state.width }}>
          <Editor />
        </div>
        <div
          ref={el => (this._resizer = el)}
          style={{
            width: 12,
            borderLeft: '3px dashed gray',
            cursor: 'col-resize'
          }}
        />
        <div className='resultContainer'>
            <Console width={this.state.width} />
        </div>
      </div>
    );
  }
}
export default App;
