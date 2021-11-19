import React, { Component } from 'react';

import Header from '../Header';
import Tab from '../Tab';
import About from '../About';
import JsonView from '../JsonView';

import { editorTab, consoleTab, outputTab } from './tabs';
import ContextMenu from '../ContextMenu';

const MIN_WIDTH = 100;
const MAX_WIDTH = 1400;

class App extends Component {
  constructor(props) {
    super(props);
    const initialWidth = 1400;
    const windowWith = window.innerWidth - 50;
    const rightWidth = windowWith - initialWidth;
    this.state = {
      width: initialWidth,
      rightWidth,
      position: null,
    };
    this.resizer = React.createRef();
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  componentDidMount() {
    this.resizer.current.addEventListener('mousedown', this.initResize, false);
  }

  componentWillUnmount() {
    this.stopResize();
  }

  initResize = () => {
    window.addEventListener('mousemove', this.startResize, false);
    window.addEventListener('mouseup', this.stopResize, false);
  };

  startResize = e => {
    let width = e.clientX;
    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
    }
    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
    }
    this.setState({ width });
  };

  stopResize = () => {
    window.removeEventListener('mousemove', this.startResize, false);
    window.removeEventListener('mouseup', this.stopResize, false);
  };

  handleContextMenu = event => {
    event.preventDefault();
    const { pageX, pageY } = event;
    const position = { top: pageY, left: pageX };
    this.setState({ position });
  };

  render() {
    const { width, rightWidth, position } = this.state;

    return (
      <div className="mainContainer">
        <Header />
        <div className="appConainer">
          <div style={{ height: '100%', width }}>
            <Tab tabs={editorTab} />
          </div>

          <div className="resizer" ref={this.resizer} />

          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              height: '100%',
              width: rightWidth,
            }}
          >
            <div style={{ minHeight: '50%', height: '50%' }}>
              <Tab tabs={outputTab} />
            </div>
            <div onContextMenu={this.handleContextMenu} style={{ minHeight: '50%', height: '50%' }}>
              <Tab tabs={consoleTab} />
            </div>
          </div>
        </div>

        <About />
        <JsonView />
        <ContextMenu position={position} onClose={() => this.setState({ position: null })} />
      </div>
    );
  }
}
export default App;
