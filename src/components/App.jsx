import React, { Component } from "react";

import Editor from "./Editor";
import Output from "./Output";

import "../styles/App.css";
import Header from "./Header";
import Tab from "./Tab";
import About from "./About";

const MIN_WIDTH = 100;
const MAX_WIDTH = 1300;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 900
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
    const { width } = this.state;

    const rightTabs = [
      {
        title: "JS Code",
        iconName: "fab fa-js-square",
        iconColor: "#FFE933",
        component: Editor
      }
    ];

    const leftTabs = [
      {
        title: "Result",
        iconName: "fa fa-terminal",
        iconWrap: true,
        component: Output,
        componentProps: { width }
      }
    ];
    return (
      <div className="mainContainer">
        <Header />
        <div className="appConainer">
          <div style={{ height: "100%", width }}>
            <Tab tabs={rightTabs} />
          </div>

          <div className="resizer" ref={this.resizer} />

          <div>
            <Tab tabs={leftTabs} />
          </div>
        </div>

        <About />
      </div>
    );
  }
}
export default App;
