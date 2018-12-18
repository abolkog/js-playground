import React, { Component } from 'react';

import Editor from './Editor';
import Console from './Console';

import '../styles/App.css';
import Header from './Header';
import Tab from './Tab';

const MIN_WIDTH = 100;
const MAX_WIDTH = 1300;

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
    let width = e.clientX;
    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
    }
    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
    }
    this.setState({ width });
  }

  _stopResize() {
    window.removeEventListener('mousemove', this._startResize, false);
    window.removeEventListener('mouseup', this._stopResize, false);
  }

  render() {
    const rightTabs = [
      {
        title: 'JS Code',
        iconName: 'fab fa-js-square',
        iconColor: '#FFE933',
        component: Editor
      }
    ];

    const leftTabs = [
      {
        title: 'Result',
        iconName: 'fa fa-terminal',
        iconWrap: true,
        component: Console,
        componentProps: { width: this.state.width }
      }
    ];
    return (
      <div className='mainContainer'>
        <Header />

        <div className='appConainer'>
          <div style={{ height: '100%', width: this.state.width }}>
            <Tab tabs={rightTabs} />
          </div>

          <div className='resizer' ref={el => (this._resizer = el)} />

          <div>
            <Tab tabs={leftTabs} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
