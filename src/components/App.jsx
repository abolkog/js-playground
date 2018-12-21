import React, { Component } from "react";

import Editor from "./Editor";
import Output from "./Output";
import Console from "./Console";
import Header from "./Header";
import Tab from "./Tab";
import About from "./About";

import "../styles/App.css";

const MIN_WIDTH = 100;
const MAX_WIDTH = 1300;

class App extends Component {
  constructor(props) {
    super(props);
    const initialWidth = 900;
    const windowWith = window.innerWidth - 50;
    const rightWidth = windowWith - initialWidth;
    this.state = {
      width: initialWidth,
      rightWidth
    };

    this.resizer = React.createRef();
    this.initResize = this.initResize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.stopResize = this.stopResize.bind(this);
  }

  componentDidMount() {
    this.resizer.current.addEventListener("mousedown", this.initResize, false);
  }

  componentWillUnmount() {
    this.stopResize();
  }

  initResize() {
    window.addEventListener("mousemove", this.startResize, false);
    window.addEventListener("mouseup", this.stopResize, false);
  }

  startResize(e) {
    let width = e.clientX;
    if (width < MIN_WIDTH) {
      width = MIN_WIDTH;
    }
    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
    }
    this.setState({ width });
  }

  stopResize() {
    window.removeEventListener("mousemove", this.startResize, false);
    window.removeEventListener("mouseup", this.stopResize, false);
  }

  render() {
    const { width, rightWidth } = this.state;

    const editorTab = [
      {
        title: "JS Code",
        iconName: "fab fa-js-square",
        iconColor: "#FFE933",
        component: Editor
      }
    ];

    const outputTab = [
      {
        title: "Result",
        iconName: "fa fa-laptop-code",
        component: Output,
        iconColor: "#89C0F4"
      }
    ];
    const consoleTab = [
      {
        title: "Console",
        iconName: "fa fa-terminal",
        iconWrap: true,
        component: Console
      }
    ];
    return (
      <div className="mainContainer">
        <Header />
        <div className="appConainer">
          <div style={{ height: "100%", width }}>
            <Tab tabs={editorTab} />
          </div>

          <div className="resizer" ref={this.resizer} />

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              height: "100%",
              width: rightWidth
            }}
          >
            <div style={{ minHeight: "50%", height: "50%" }}>
              <Tab tabs={outputTab} />
            </div>
            <div style={{ minHeight: "50%", height: "50%" }}>
              <Tab tabs={consoleTab} />
            </div>
          </div>
        </div>

        <About />
      </div>
    );
  }
}
export default App;
